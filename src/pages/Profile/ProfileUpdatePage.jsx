import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Modal, Container } from "react-bootstrap";
import Header from "../../components/Header";

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", contact: "" });
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    // 현재 로그인된 사용자의 정보를 localStorage에서 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user:", loggedInUser);

    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 사용자 데이터 불러오기
    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setNewName(data.username);
        setNewContact(data.contact);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 수정된 데이터 저장
    const updatedData = {
      username: newName,
      contact: newContact,
    };

    // 콘솔 로그 추가
    console.log("Updated Data:", updatedData);

    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        return response.json();
      })
      .then(() => {
        setUserData(updatedData);
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
            <div className="info-section">
              <h2>프로필 수정</h2>
              <Button
                className="card-button"
                variant="primary"
                onClick={() => setShowModal(true)}
              >
                수정
              </Button>
            </div>
            <p>이름: {userData.username}</p>
            <p>전화번호: {userData.contact}</p>
          </Card.Body>
        </Card>
      </div>

      {/* 수정 모달 */}
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
