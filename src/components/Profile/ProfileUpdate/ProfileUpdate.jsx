import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import * as S from "../style";
import ProfileTitle from "../ProfileContent/ProfileTitle";

function ProfileUpdate() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    contact: "",
    profileImgUrl: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  const [contactError, setContactError] = useState("");

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  const handleContactChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 11);
    setNewContact(input);

    if (input.length === 11) {
      setContactError("");
    } else if (input.length > 0) {
      setContactError("전화번호는 11자리여야 합니다");
    } else {
      setContactError("");
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setNewName(data.username);
        setNewContact(data.contact);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImgUrl(file);
  };

  const updateUserDataGlobally = (updatedData) => {
    // Base64 이미지 데이터로 변환
    const profileImageSrc = updatedData.profileImg
      ? `data:image/jpeg;base64,${updatedData.profileImg}`
      : null;

    // 로컬 스토리지와 상태 모두 업데이트
    const userDataToStore = {
      ...updatedData,
      profileImg: profileImageSrc,
    };

    localStorage.setItem("user", JSON.stringify(userDataToStore));
    setUserData({
      ...userData,
      username: updatedData.username,
      contact: updatedData.contact,
      profileImg: updatedData.profileImg,
    });

    // 프로필 컴포넌트의 상태 업데이트를 위해 이벤트 발생
    const profileUpdateEvent = new CustomEvent("profileUpdated", {
      detail: userDataToStore,
    });
    window.dispatchEvent(profileUpdateEvent);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    if (newContact.length !== 11) {
      setContactError("전화번호는 11자리여야 합니다");
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "userData",
      new Blob(
        [
          JSON.stringify({
            username: newName,
            contact: newContact,
            googleId: loggedInUser.googleId,
          }),
        ],
        { type: "application/json" },
      ),
    );

    if (profileImgUrl) {
      formData.append("profileImg", profileImgUrl);
    }

    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update profile: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
          .then((response) => response.json())
          .then((updatedData) => {
            updateUserDataGlobally(updatedData);
            setShowModal(false);
          });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleDeleteAccount = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete account: ${response.status}`);
        }
        localStorage.removeItem("user");
        setShowDeleteModal(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <S.ProfileContainer>
      <ProfileTitle title={"내 프로필"} />
      <S.CardSection>
        <S.StyledCard>
          <S.Card>
            <div className="info-section d-flex justify-content-between align-items-center">
              <S.CardButton onClick={() => setShowModal(true)}>
                수정
              </S.CardButton>
            </div>
            <div className="text-center mt-3">
              <S.ProfileImage
                src={
                  userData.profileImg
                    ? `data:image/jpeg;base64,${userData.profileImg}`
                    : "/img/default-avatar.png"
                }
                alt="User Profile"
              />
            </div>
            <p className="mt-3">이름: {userData.username}</p>
            <p>전화번호: {formatPhoneNumber(userData.contact)}</p>
            <div
              className="text-center mt-3"
              onClick={() => setShowDeleteModal(true)}
              style={{ cursor: "pointer", color: "#ff0000" }}
            >
              탈퇴하기
            </div>
          </S.Card>
        </S.StyledCard>
      </S.CardSection>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            계정 삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>프로필 수정</Modal.Title>
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
                value={formatPhoneNumber(newContact)}
                onChange={handleContactChange}
                isInvalid={!!contactError}
                placeholder="숫자만 입력하세요"
              />
              <Form.Control.Feedback type="invalid">
                {contactError}
              </Form.Control.Feedback>
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

      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>탈퇴 완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>계정이 성공적으로 삭제되었습니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </S.ProfileContainer>
  );
}

export default ProfileUpdate;
