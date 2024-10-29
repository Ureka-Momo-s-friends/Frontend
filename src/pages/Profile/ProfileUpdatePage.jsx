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
  }); // 사용자 정보를 저장할 state
  const [showModal, setShowModal] = useState(false); // 수정 모달을 열지 여부를 저장할 state
  const [newName, setNewName] = useState(""); // 수정할 이름을 저장할 state
  const [newContact, setNewContact] = useState(""); // 수정할 연락처를 저장할 state
  const [profileImgUrl, setProfileImgUrl] = useState(null); // 수정할 프로필 이미지 파일을 저장할 state

  // 컴포넌트가 처음 렌더링될 때, 사용자의 현재 정보를 가져옴
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 사용자 데이터 가져오기
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

  // 프로필 이미지 파일이 변경되었을 때 호출되는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImgUrl(file);
  };

  // 사용자 정보를 저장할 때 호출되는 함수
  const handleSaveChanges = (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // 사용자 정보를 폼 데이터로 생성
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

    // 프로필 이미지 파일이 있는 경우 추가
    if (profileImgUrl) {
      formData.append("profileImg", profileImgUrl);
    }

    // API를 통해 사용자 정보를 업데이트
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

        // 업데이트된 사용자 정보를 다시 가져와 상태 업데이트
        fetch(`http://localhost:8080/api/members/${loggedInUser.id}`)
          .then((response) => response.json())
          .then((updatedData) => {
            setUserData({
              ...userData,
              username: updatedData.username,
              contact: updatedData.contact,
              profileImg: updatedData.profileImg,
            });

            // 로컬 스토리지에도 업데이트된 사용자 정보 저장
            localStorage.setItem("user", JSON.stringify(updatedData));
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

      {/* 사용자 프로필 카드 섹션 */}
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
              {/* 프로필 이미지 표시 */}
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

      {/* 프로필 수정 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>프로필 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 프로필 수정 폼 */}
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
