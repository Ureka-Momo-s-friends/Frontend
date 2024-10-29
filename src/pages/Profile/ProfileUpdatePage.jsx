import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Modal, Container, Image } from "react-bootstrap";
import Header from "../../components/Header";

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    contact: "",
    profileImgUrl: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState(null);

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

  const handleSaveChanges = (e) => {
    e.preventDefault();

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
        console.log("Updated user data:", data);
        setUserData({
          ...userData,
          username: newName,
          contact: newContact,
          profileImg: data.profileImg,
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <Container className="profile-container mt-4">
      <Header />
      <div className="card-section">
        <Card>
          <Card.Body>
            <div className="info-section d-flex justify-content-between align-items-center">
              <h2>프로필 수정</h2>
              <Button
                className="card-button"
                variant="secondary"
                size="sm"
                onClick={() => setShowModal(true)} // 클릭 시 모달 열기
              >
                수정
              </Button>
            </div>
            <div className="text-center mt-3">
              <Image
                src={
                  userData.profileImg
                    ? `data:image/jpeg;base64,${userData.profileImg}`
                    : null
                }
                alt="User Profile"
                roundedCircle
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <p className="mt-3">이름: {userData.username}</p>
            <p>전화번호: {userData.contact}</p>
          </Card.Body>
        </Card>
      </div>

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
    </Container>
  );
}

export default ProfileUpdatePage;
