import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, ListGroup, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header"; // Header 컴포넌트 경로 확인

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // 사용자 정보를 저장할 state
  const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 state
  const [error, setError] = useState(null); // 오류 메시지를 저장할 state
  const [petData, setPetData] = useState([]); // 고양이 데이터를 저장할 state
  const [selectedPet, setSelectedPet] = useState(null); // 선택한 고양이를 저장할 state
  const [selectedUser, setSelectedUser] = useState(null); // 선택한 사용자 저장할 state
  const [showPetModal, setShowPetModal] = useState(false); // 고양이 모달 표시 상태
  const [showUserModal, setShowUserModal] = useState(false); // 사용자 모달 표시 상태

  // 사용자 프로필 수정 페이지로 이동
  const handleProfileEdit = () => {
    navigate("/profileupdate");
  };

  // 고양이 프로필 수정 페이지로 이동
  const handlePetProfileEdit = () => {
    navigate("/petprofileupdate");
  };

  // 고양이 프로필 카드 클릭 시 모달을 열고, 선택한 고양이 데이터를 저장
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setShowPetModal(true);
  };

  // 사용자 프로필 카드 클릭 시 모달을 열고, 선택한 사용자 데이터를 저장
  const handleUserClick = () => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  // 고양이 모달 닫기
  const handleClosePetModal = () => {
    setShowPetModal(false);
    setSelectedPet(null);
  };

  // 사용자 모달 닫기
  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  // API 호출을 통해 고양이 목록을 불러오는 함수
  const fetchPetList = (userId) => {
    fetch(`http://localhost:8080/api/pets/member/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // 고양이 이미지가 있는 경우 Base64 URL로 변환하여 저장
        const petsWithImages = data.map((pet) => ({
          ...pet,
          profileImg: pet.profileImg
            ? `data:image/jpeg;base64,${pet.profileImg}`
            : null,
        }));
        setPetData(petsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  };

  // 컴포넌트가 처음 렌더링될 때 사용자 정보와 고양이 목록을 불러옴
  useEffect(() => {
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
        fetchPetList(loggedInUser.id); // 사용자의 고양이 목록 가져오기
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // 로딩 중일 때 표시할 메시지
  if (loading) {
    return <div>Loading...</div>;
  }

  // 오류가 발생했을 때 표시할 메시지
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 사용자 데이터가 없을 때 표시할 메시지
  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <Container className="profile-container mt-4">
      <Header />

      {/* 사용자 프로필 섹션 */}
      <div className="card-section">
        <Card onClick={handleUserClick}>
          <Card.Body>
            <div className="info-section d-flex justify-content-between align-items-center">
              <Button
                className="card-button"
                variant="secondary"
                onClick={handleProfileEdit}
              >
                편집
              </Button>
            </div>
            <div className="d-flex align-items-center mt-3">
              {/* 유저 프로필 이미지 표시 */}
              <img
                src={
                  userData.profileImg
                    ? `data:image/jpeg;base64,${userData.profileImg}`
                    : null
                }
                alt="User Profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
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

      {/* 고양이 프로필 섹션 */}
      <div className="card-section mt-4">
        <Card>
          <Card.Body>
            <div className="info-section d-flex justify-content-between align-items-center">
              <h2>우리집 냥이들</h2>
              <Button
                className="card-button"
                variant="primary"
                onClick={handlePetProfileEdit}
              >
                편집
              </Button>
            </div>
            <ListGroup variant="flush" className="mt-3">
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
                    src={pet.profileImg}
                    alt="Pet Profile"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
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

      {/* 고양이 상세 정보 모달 */}
      <Modal show={showPetModal} onHide={handleClosePetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>고양이 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && (
            <div className="d-flex align-items-center">
              {/* 텍스트를 왼쪽, 이미지를 오른쪽에 배치 */}
              <div className="pet-info text-left flex-grow-1">
                <h3 style={{ fontWeight: "bold" }}>{selectedPet.petName}</h3>
                <p style={{ margin: 0, color: "#888" }}>
                  {selectedPet.breed || "알 수 없음"}
                </p>
                <p style={{ margin: 0 }}>
                  성별: {selectedPet.gender ? "암컷" : "수컷"}
                </p>
                <p style={{ margin: 0 }}>생일: {selectedPet.birthDate}</p>
              </div>
              <div className="pet-image ml-3">
                <img
                  src={selectedPet.profileImg}
                  alt="Selected Pet"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePetModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 사용자 상세 정보 모달 */}
      <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>사용자 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="d-flex align-items-center">
              {/* 텍스트를 왼쪽, 이미지를 오른쪽에 배치 */}
              <div className="user-info text-left flex-grow-1">
                <h3 style={{ fontWeight: "bold" }}>{selectedUser.username}</h3>
                <p style={{ margin: 0 }}>연락처: {selectedUser.contact}</p>
              </div>
              <div className="user-image ml-3">
                <img
                  src={
                    selectedUser.profileImg
                      ? `data:image/jpeg;base64,${selectedUser.profileImg}`
                      : null
                  }
                  alt="Selected User"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
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
