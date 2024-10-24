import React, { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Container } from "react-bootstrap";
import Header from "../../components/Header";

function PetProfileUpdatePage() {
  const [petList, setPetList] = useState([]); // 전체 고양이 목록
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState({
    id: null,
    petName: "",
    birthDate: "",
    gender: "",
  });
  const [newPet, setNewPet] = useState({
    petName: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    // API 호출을 통해 전체 고양이 데이터 불러오기
    fetch("http://localhost:8080/api/pets")
      .then((response) => response.json())
      .then((data) => {
        setPetList(data);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setSelectedPet({ ...selectedPet, profileImgUrl: file });
    } else {
      setNewPet({ ...newPet, profileImgUrl: file });
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // gender를 Boolean 타입으로 변환
    const genderBoolean = selectedPet.gender === "암컷" ? true : false;

    // JSON 데이터를 FormData에 추가
    const petData = {
      petName: selectedPet.petName,
      birthDate: selectedPet.birthDate,
      gender: genderBoolean,
      member: 2, // 현재 고정된 멤버 ID
    };

    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    // 이미지가 있다면 추가
    if (selectedPet.profileImgUrl) {
      formData.append("profileImgUrl", selectedPet.profileImgUrl);
    }

    // FormData에 추가된 데이터를 확인하기 위한 콘솔 로그
    console.log("FormData content:", formData.get("profileImgUrl"));

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
      .then(() => {
        // 프로필 업데이트 후 새로 고침
        setPetList((prevList) =>
          prevList.map((pet) =>
            pet.id === selectedPet.id ? { ...pet, ...petData } : pet,
          ),
        );
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating pet profile:", error);
      });
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const genderBoolean = newPet.gender === "암컷" ? true : false;

    const formData = new FormData();
    const petData = {
      petName: newPet.petName,
      birthDate: newPet.birthDate,
      gender: genderBoolean,
      member: 2, // 고정된 멤버 ID
    };

    // JSON 데이터를 FormData에 추가
    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    // 이미지가 선택된 경우에만 FormData에 추가
    if (newPet.profileImgUrl && newPet.profileImgUrl instanceof File) {
      formData.append("profileImgUrl", newPet.profileImgUrl);
    }

    fetch("http://localhost:8080/api/pets", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add pet");
        }
        return response.json(); // 서버에서 반환된 새로운 pet 객체를 받아옴
      })
      .then((createdPet) => {
        // 서버에서 받아온 새로운 pet 객체를 이용하여 상태를 업데이트
        setPetList((prevList) => [...prevList, createdPet]);
        setShowAddModal(false);
        // 데이터 초기화
        setNewPet({
          petName: "",
          birthDate: "",
          gender: "",
          profileImgUrl: null,
        });
      })
      .catch((error) => {
        console.error("Error adding pet:", error);
      });
  };

  const handleDeletePet = (petId) => {
    fetch(`http://localhost:8080/api/pets/${petId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete pet");
        }
        // 성공 시 해당 고양이 제거
        setPetList(petList.filter((pet) => pet.id !== petId));
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <Container className="profile-container mt-4">
      <Header />
      {petList.map((pet, index) => (
        <div key={index} className="card-section">
          <Card>
            <Card.Body>
              <div className="info-section">
                <Button
                  className="card-button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedPet({
                      id: pet.id, // ID 포함
                      petName: pet.petName,
                      birthDate: pet.birthDate,
                      gender: pet.gender ? "암컷" : "수컷",
                      profileImgUrl: null,
                    });
                    setShowEditModal(true);
                  }}
                >
                  수정
                </Button>
              </div>
              <h6>{`${pet.petName}`}</h6>
              <p>{`${pet.breed} | ${pet.birthDate} | ${pet.gender ? "암컷" : "수컷"}`}</p>
              <div
                className="text-center mt-3"
                onClick={() => handleDeletePet(pet.id)}
                style={{ cursor: "pointer", color: "#ff0000" }}
              >
                삭제하기
              </div>
            </Card.Body>
          </Card>
        </div>
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
    </Container>
  );
}

export default PetProfileUpdatePage;
