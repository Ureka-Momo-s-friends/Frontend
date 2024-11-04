import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Modal, Container, Image } from "react-bootstrap";
import Header from "../../components/Header";
import {
  ProfileContainer,
  CardSection,
  StyledCard,
  CardButton,
  ProfileImage,
} from "./style"; // 스타일 임포트

function ProfileUpdatePage() {
  const navigate = useNavigate();

  // 사용자 데이터 상태 관리
  const [userData, setUserData] = useState({
    username: "",
    contact: "",
    profileImgUrl: "",
  });

  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 성공 모달 상태 추가

  // 프로필 정보 수정 상태 관리
  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  // 사용자 데이터 로드
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

  // 파일 선택 시 파일 상태 설정
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImgUrl(file);
  };

  // 프로필 정보 저장 핸들러
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
        fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
          .then((response) => response.json())
          .then((updatedData) => {
            setUserData({
              ...userData,
              username: updatedData.username,
              contact: updatedData.contact,
              profileImg: updatedData.profileImg,
            });

            localStorage.setItem("user", JSON.stringify(updatedData));
          });

        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  // 계정 삭제 핸들러
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
        setShowDeleteModal(false); // 삭제 모달 닫기
        setShowSuccessModal(true); // 성공 모달 열기
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  // 성공 모달 확인 버튼 클릭 시 홈으로 이동
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/"); // 홈으로 이동
  };

  return (
    <ProfileContainer>
      <Header />
      <CardSection>
        <StyledCard>
          <Card.Body>
            <div className="info-section d-flex justify-content-between align-items-center">
              <h2>프로필 수정</h2>
              <CardButton onClick={() => setShowModal(true)}>수정</CardButton>
            </div>
            <div className="text-center mt-3">
              <ProfileImage
                src={
                  userData.profileImg
                    ? `data:image/jpeg;base64,${userData.profileImg}`
                    : null
                }
                alt="User Profile"
              />
            </div>
            <p className="mt-3">이름: {userData.username}</p>
            <p>전화번호: {userData.contact}</p>
            <div
              className="text-center mt-3"
              onClick={() => setShowDeleteModal(true)}
              style={{ cursor: "pointer", color: "#ff0000" }}
            >
              탈퇴하기
            </div>
          </Card.Body>
        </StyledCard>
      </CardSection>

      {/* 삭제 모달 */}
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

      {/* 탈퇴 성공 모달 */}
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
    </ProfileContainer>
  );
}

export default ProfileUpdatePage;
