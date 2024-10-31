import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import Login from "../../Login";
import { BackArrowIcon } from "assets/svgs";
import { Modal, Form, Button } from "react-bootstrap";

const Header = ({ isBack }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (event) => {
    setNewProfileImg(event.target.files[0]);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.googleId) {
      console.error("googleId is missing. Cannot proceed with registration.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "userData",
      JSON.stringify({
        username: newName,
        contact: newContact,
        googleId: loggedInUser.googleId,
      }),
    );

    if (newProfileImg) {
      formData.append("profileImg", newProfileImg);
    }

    fetch("http://localhost:8080/api/members/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register new user");
        }
        return response.json();
      })
      .then((data) => {
        const profileImageSrc = data.profileImg
          ? `data:image/jpeg;base64,${data.profileImg}`
          : null;

        const userWithProfileImg = {
          ...data,
          profileImg: profileImageSrc,
        };

        setUser(userWithProfileImg);
        localStorage.setItem("user", JSON.stringify(userWithProfileImg));
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error registering new user:", error);
      });
  };

  return (
    <S.Layer>
      {isBack && <BackArrowIcon onClick={() => navigate("/")} />}
      <img
        src="/img/mm.png"
        alt="로고"
        height={"56px"}
        onClick={() => navigate("/")}
      />
      <S.HeaderTop>
        <S.ProfileIcon onClick={handleProfileClick} ref={dropdownRef}>
          {user && user.profileImg ? (
            <img
              src={user.profileImg}
              alt="프로필"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span>👤</span>
          )}
          {isDropdownOpen && (
            <S.DropdownMenu>
              {user ? (
                <S.DropdownItem
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/");
                  }}
                >
                  로그아웃
                </S.DropdownItem>
              ) : (
                <Login setUser={setUser} setShowModal={setShowModal} />
              )}
            </S.DropdownMenu>
          )}
        </S.ProfileIcon>
      </S.HeaderTop>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>프로필 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveChanges}>
            <Form.Group controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formContact" className="mt-3">
              <Form.Label>전화번호</Form.Label>
              <Form.Control
                type="text"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProfileImg" className="mt-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              저장
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </S.Layer>
  );
};

export default Header;
