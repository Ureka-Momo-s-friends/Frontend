import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaReceipt } from "react-icons/fa"; // 영수증 이모티콘 추가
import * as S from "../style";

function ProfileContent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petData, setPetData] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

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

  const fetchPetList = (userId) => {
    fetch(`http://localhost:8080/api/pets/member/${userId}`)
      .then((response) => response.json())
      .then((data) => {
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

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.id) {
      setError("로그인된 사용자가 없습니다.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        fetchPetList(loggedInUser.id);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
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

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <S.ProfileContainer>
      <S.CardSection>
        <S.StyledCard onClick={handleUserClick}>
          <div className="info-section d-flex justify-content-between align-items-center">
            <h5 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              내 프로필
            </h5>
            <S.CardButton onClick={() => navigate("update")}>편집</S.CardButton>
          </div>
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <S.ProfileImage
                src={
                  userData.profileImg
                    ? `data:image/jpeg;base64,${userData.profileImg}`
                    : "/img/default-avatar.png"
                }
                alt="User Profile"
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {userData.username}
                </p>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </S.StyledCard>
      </S.CardSection>

      <S.CardSection>
        <S.StyledCard>
          <div className="info-section d-flex justify-content-between align-items-center">
            <h5 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              우리집 냥이들
            </h5>
            <S.CardButton onClick={() => navigate("petupdate")}>
              편집
            </S.CardButton>
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
                <S.PetProfileImage
                  src={pet.profileImg ? pet.profileImg : "/img/default-cat.png"}
                  alt="Pet Profile"
                />
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>{pet.petName}</p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </S.StyledCard>
      </S.CardSection>

      {/* 주문 내역 카드 추가 */}
      <S.CardSection>
        <S.StyledCard onClick={() => navigate("/history")}>
          <div className="d-flex align-items-center">
            <FaReceipt size={40} color="#555" style={{ marginRight: "15px" }} />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>주문 내역</p>
            </div>
          </div>
        </S.StyledCard>
      </S.CardSection>

      {/* 고양이 상세정보 모달 */}
      <Modal show={showPetModal} onHide={handleClosePetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>고양이 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && (
            <S.ProfileImageContainer>
              <div className="pet-info flex-grow-1">
                <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {selectedPet.petName}
                </h3>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  종: {selectedPet.breed || "알 수 없음"}
                </p>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  성별: {selectedPet.gender ? "암컷" : "수컷"}
                </p>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  생일: {selectedPet.birthDate || "알 수 없음"}
                </p>
              </div>
              <S.ModalImage
                src={
                  selectedPet.profileImg
                    ? selectedPet.profileImg
                    : "/img/default-cat.png"
                }
                alt="Selected Pet"
              />
            </S.ProfileImageContainer>
          )}
        </Modal.Body>
      </Modal>

      {/* 사용자 상세정보 모달 */}
      <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>사용자 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <S.ProfileImageContainer>
              <div className="user-info flex-grow-1">
                <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {selectedUser.username}
                </h3>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  연락처: {formatPhoneNumber(selectedUser.contact)}
                </p>
              </div>
              <S.ModalImage
                src={
                  selectedUser.profileImg
                    ? `data:image/jpeg;base64,${selectedUser.profileImg}`
                    : "/img/default-avatar.png"
                }
                alt="Selected User"
              />
            </S.ProfileImageContainer>
          )}
        </Modal.Body>
      </Modal>
    </S.ProfileContainer>
  );
}

export default ProfileContent;
