import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Modal,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import Header from "../../components/Header";
import {
  ProfileContainer,
  CardSection,
  StyledCard,
  CardButton,
  PetProfileImage,
  ModalImage,
} from "./style"; // 공통 스타일 임포트

function PetProfileUpdatePage() {
  const [petList, setPetList] = useState([]); // 전체 고양이 목록을 저장할 state
  const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 표시 상태
  const [showAddModal, setShowAddModal] = useState(false); // 추가 모달 표시 상태
  const [selectedPet, setSelectedPet] = useState({
    id: null,
    petName: "",
    breed: "",
    birthDate: "",
    gender: "",
    profileImg: null,
  }); // 수정할 고양이 정보를 저장할 state
  const [newPet, setNewPet] = useState({
    petName: "",
    birthDate: "",
    breed: "",
    gender: "",
    profileImg: null,
  }); // 추가할 고양이 정보를 저장할 state

  // 컴포넌트가 처음 렌더링될 때 고양이 목록을 불러오는 함수
  useEffect(() => {
    fetchPetList();
  }, []);

  // 사용자의 고양이 목록을 불러오는 함수
  const fetchPetList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 해당 사용자의 고양이 데이터 불러오기
    fetch(`http://localhost:8080/api/pets/member/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        // 데이터가 base64로 인코딩된 이미지를 포함하고 있는 경우 처리
        const petsWithImages = data.map((pet) => ({
          ...pet,
          profileImg: pet.profileImg
            ? `data:image/jpeg;base64,${pet.profileImg}`
            : null,
        }));
        setPetList(petsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  };

  // 파일이 변경될 때 호출되는 핸들러
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setSelectedPet({ ...selectedPet, profileImg: file });
    } else {
      setNewPet({ ...newPet, profileImg: file });
    }
  };

  // 고양이 정보를 수정하고 저장하는 함수
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // 성별 값을 boolean 형태로 변환
    const genderBoolean = selectedPet.gender === "암컷" ? true : false;
    const petData = {
      petName: selectedPet.petName,
      petBreed: selectedPet.petBreed,
      birthDate: selectedPet.birthDate,
      gender: genderBoolean,
      member: loggedInUser.id, // 현재 로그인된 사용자의 ID
    };

    // JSON 데이터를 FormData에 추가
    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    // 새로운 파일이 선택된 경우에만 파일 추가
    if (selectedPet.profileImg && selectedPet.profileImg instanceof File) {
      formData.append("profileImg", selectedPet.profileImg);
      console.log("Image file added for update:", selectedPet.profileImg.name);
    } else {
      console.log("No new image file selected for update");
    }

    // API 호출을 통해 고양이 정보 업데이트
    fetch(`http://localhost:8080/api/pets/${selectedPet.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update pet profile");
        }
        return response.json();
      })
      .then((updatedPet) => {
        // 상태 업데이트 후 전체 목록 새로 불러오기
        fetchPetList();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating pet profile:", error);
      });
  };

  // 새로운 고양이를 추가하는 함수
  const handleAddPet = (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // 성별 값을 boolean 형태로 변환
    const genderBoolean = newPet.gender === "암컷" ? true : false;
    const formData = new FormData();
    const petData = {
      petName: newPet.petName,
      birthDate: newPet.birthDate,
      gender: genderBoolean,
      memberId: loggedInUser.id,
    };

    // JSON 데이터를 FormData에 추가
    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    // 새로운 이미지 파일이 선택된 경우에만 추가
    if (newPet.profileImg && newPet.profileImg instanceof File) {
      formData.append("profileImg", newPet.profileImg);
      console.log("Image File added to FormData:", newPet.profileImg.name);
    } else {
      console.log("No image file selected");
    }

    // API 호출을 통해 새로운 고양이 추가
    fetch("http://localhost:8080/api/pets", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add pet: ${response.status}`);
        }
        return response.json();
      })
      .then((createdPet) => {
        // 상태 업데이트 후 전체 목록 새로 불러오기
        fetchPetList();
        setShowAddModal(false);
        setNewPet({
          petName: "",
          birthDate: "",
          gender: "",
          profileImg: null,
        });
      })
      .catch((error) => {
        console.error("Error adding pet:", error);
      });
  };

  // 고양이 정보를 삭제하는 함수
  const handleDeletePet = (petId) => {
    fetch(`http://localhost:8080/api/pets/${petId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete pet");
        }
        // 상태 업데이트 후 전체 목록 새로 불러오기
        fetchPetList();
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <ProfileContainer>
      <Header />
      {petList.map((pet) => (
        <CardSection key={pet.id}>
          <StyledCard>
            <Card.Body>
              <Row>
                <Col xs={3}>
                  {/* 여기서 이미지를 왼쪽에 배치 */}
                  <PetProfileImage
                    src={pet.profileImg}
                    alt="Pet Profile"
                    className="img-fluid"
                  />
                </Col>
                <Col xs={9}>
                  <div className="info-section d-flex justify-content-between align-items-center">
                    <h6>{`${pet.petName}`}</h6>
                    <CardButton
                      onClick={() => {
                        setSelectedPet({
                          id: pet.id,
                          petName: pet.petName,
                          birthDate: pet.birthDate,
                          gender: pet.gender ? "암컷" : "수컷",
                          profileImg: null,
                        });
                        setShowEditModal(true);
                      }}
                    >
                      수정
                    </CardButton>
                  </div>
                  <p>{`${pet.breed || "종 정보 없음"} | ${pet.birthDate} | ${
                    pet.gender ? "암컷" : "수컷"
                  }`}</p>
                  <div
                    className="text-center mt-3"
                    onClick={() => handleDeletePet(pet.id)}
                    style={{ cursor: "pointer", color: "#ff0000" }}
                  >
                    삭제하기
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </StyledCard>
        </CardSection>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => setShowAddModal(true)}
        className="mt-3"
      >
        추가하기
      </Button>

      {/* 수정 모달 */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>고양이 프로필 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveChanges}>
            <Form.Group controlId="formPetName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={selectedPet.petName}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, petName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPetBreed">
              <Form.Label>종</Form.Label>
              <Form.Control
                type="text"
                value={selectedPet.petBreed}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, petBreed: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBirthDate" className="mt-3">
              <Form.Label>생일</Form.Label>
              <Form.Control
                type="date"
                value={selectedPet.birthDate}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, birthDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGender" className="mt-3">
              <Form.Label>성별</Form.Label>
              <Form.Control
                as="select"
                value={selectedPet.gender}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, gender: e.target.value })
                }
              >
                <option value="암컷">암컷</option>
                <option value="수컷">수컷</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProfileImg" className="mt-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, true)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" size="sm">
              저장
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* 추가 모달 */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>고양이 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPet}>
            <Form.Group controlId="formNewPetName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={newPet.petName}
                onChange={(e) =>
                  setNewPet({ ...newPet, petName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formNewPetBreed">
              <Form.Label>종</Form.Label>
              <Form.Control
                type="text"
                value={newPet.petBreed}
                onChange={(e) =>
                  setNewPet({ ...newPet, petBreed: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formNewBirthDate" className="mt-3">
              <Form.Label>생일</Form.Label>
              <Form.Control
                type="date"
                value={newPet.birthDate}
                onChange={(e) =>
                  setNewPet({ ...newPet, birthDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formNewGender" className="mt-3">
              <Form.Label>성별</Form.Label>
              <Form.Control
                as="select"
                value={newPet.gender}
                onChange={(e) =>
                  setNewPet({ ...newPet, gender: e.target.value })
                }
              >
                <option value="암컷">암컷</option>
                <option value="수컷">수컷</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNewProfileImg" className="mt-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, false)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" size="sm">
              등록
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ProfileContainer>
  );
}

export default PetProfileUpdatePage;
