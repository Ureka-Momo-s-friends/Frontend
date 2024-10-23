import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petName, setPetName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const handleProfileEdit = () => {
    navigate("/profileupdate");
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/members/2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePetRegistration = (e) => {
    e.preventDefault();
    const petData = { petName, birthDate, gender };

    fetch("http://localhost:8080/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to register pet");
        return response.json();
      })
      .then((data) => {
        console.log("Pet registered with ID:", data);
        setPetName("");
        setBirthDate("");
        setGender("");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-container">
      <div className="left-side">
        <div className="user-avatar"></div>
        <button className="profile-edit-button" onClick={handleProfileEdit}>
          프로필 수정
        </button>
        <div className="line line-2"></div>
        <div className="info-label name">이름: {userData.username}</div>
        <div className="info-label phone">전화번호: {userData.contact}</div>
      </div>
      <div className="divider"></div>
      <div className="right-side">
        <h2>고양이 프로필</h2>
        <div className="user-avatar"></div>
        <div className="info-label cat-name">이름: 나비</div>
        <div className="info-label cat-gender">성별: 암컷</div>
        <div className="info-label cat-birth">생일: 2020-04-05</div>

        {/* Bootstrap 모달 */}
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          고양이 등록
        </Button>

        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>고양이 등록</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePetRegistration}>
              <Form.Group>
                <Form.Label>이름:</Form.Label>
                <Form.Control
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>생일:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>성별:</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="암컷">암컷</option>
                  <option value="수컷">수컷</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                등록
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ProfilePage;
