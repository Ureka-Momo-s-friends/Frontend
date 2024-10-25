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
  const [selectedUser, setSelectedUser] = useState(null); // 선택한 사용자 저장할 state
  const [showPetModal, setShowPetModal] = useState(false); // 고양이 모달 표시 상태
  const [showUserModal, setShowUserModal] = useState(false); // 사용자 모달 표시 상태

  const handleProfileEdit = () => {
    navigate("/profileupdate");
  };

  const handlePetProfileEdit = () => {
    navigate("/petprofileupdate");
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setShowPetModal(true);
  };

  const handleUserClick = () => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  const handleClosePetModal = () => {
    setShowPetModal(false);
    setSelectedPet(null);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    // 현재 로그인한 사용자 정보를 localStorage에서 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.id) {
      setError("로그인된 사용자가 없습니다.");
      setLoading(false);
      return;
    }

    // API 호출을 통해 사용자 데이터 가져오기
    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
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

    // 고양이 데이터 가져오기 - 현재 로그인한 사용자의 고양이만 가져옴
    fetch(`http://localhost:8080/api/pets/member/${loggedInUser.id}`)
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
        <Card onClick={handleUserClick}>
          {" "}
          {/* 사용자 프로필 클릭 시 모달 표시 */}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* 유저 프로필 이미지 표시 */}
              <img
                src={`http://localhost:8080${userData.profileImgUrl}`}
                alt="User Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "15px",
                }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {userData.username}
                </p>
              </div>
            </div>
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
                  onClick={() => handlePetClick(pet)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* 고양이 프로필 이미지 표시 */}
                  <img
                    src={`http://localhost:8080${pet.profileImgUrl}`}
                    alt="Pet Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {pet.petName}
                    </p>
                    <p style={{ margin: 0, color: "#888" }}>
                      {pet.breed || "알 수 없음"}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>

      {/* Pet Details Modal */}
      <Modal show={showPetModal} onHide={handleClosePetModal}>
        <Modal.Header closeButton>
          <Modal.Title>고양이 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && (
            <div>
              {/* 선택한 고양이 이미지 표시 */}
              <img
                src={`http://localhost:8080${selectedPet.profileImgUrl}`}
                alt="Selected Pet"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <p>이름: {selectedPet.petName}</p>
              <p>종: {selectedPet.breed || "알 수 없음"}</p>
              <p>성별: {selectedPet.gender ? "암컷" : "수컷"}</p>
              <p>생일: {selectedPet.birthDate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePetModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>사용자 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              {/* 선택한 사용자 이미지 표시 */}
              <img
                src={`http://localhost:8080${selectedUser.profileImgUrl}`}
                alt="Selected User"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <p>이름: {selectedUser.username}</p>
              <p>연락처: {selectedUser.contact}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfilePage;
