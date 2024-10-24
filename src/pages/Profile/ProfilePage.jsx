import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, ListGroup, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header"; // Header 컴포넌트 경로 확인

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petData, setPetData] = useState([]); // 고양이 데이터를 저장할 state 추가
  const [selectedPet, setSelectedPet] = useState(null); // 선택한 고양이를 저장할 state
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const handleProfileEdit = () => {
    navigate("/profileupdate");
  };

  const handlePetProfileEdit = () => {
    navigate("/petprofileupdate");
  };

  const handleDoubleClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  useEffect(() => {
    // 사용자 데이터 가져오기
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

    // 고양이 데이터 가져오기
    fetch("http://localhost:8080/api/pets")
      .then((response) => response.json())
      .then((data) => {
        setPetData(data);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

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
    <Container className="profile-container mt-4">
      <Header />
      {/* User Profile Section */}
      <div className="card-section">
        <Card>
          <Card.Body>
            <div className="info-section">
              <h2>프로필 정보</h2>
              <Button
                className="card-button"
                variant="secondary"
                onClick={handleProfileEdit}
              >
                편집
              </Button>
            </div>
            <p>{userData.username}</p>
          </Card.Body>
        </Card>
      </div>

      {/* Cat Profiles Section */}
      <div className="card-section">
        <Card>
          <Card.Body>
            <div className="info-section">
              <h2>고양이 프로필</h2>
              <Button
                className="card-button"
                variant="primary"
                onClick={handlePetProfileEdit}
              >
                편집
              </Button>
            </div>
            <ListGroup variant="flush">
              {petData.map((pet) => (
                <ListGroup.Item
                  key={pet.id}
                  onDoubleClick={() => handleDoubleClick(pet)}
                  style={{ cursor: "pointer" }}
                >
                  이름: {pet.petName} | 종: {pet.breed || "알 수 없음"} |{" "}
                  {pet.birthDate}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>

      {/* Pet Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>고양이 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && (
            <div>
              <p>이름: {selectedPet.petName}</p>
              <p>종: {selectedPet.breed || "알 수 없음"}</p>
              <p>성별: {selectedPet.gender ? "암컷" : "수컷"}</p>
              <p>생일: {selectedPet.birthDate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfilePage;
