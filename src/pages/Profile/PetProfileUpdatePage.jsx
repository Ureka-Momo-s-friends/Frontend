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
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 해당 사용자의 고양이 데이터 불러오기
    fetch(`http://localhost:8080/api/pets/member/${loggedInUser.id}`)
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

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    const genderBoolean = selectedPet.gender === "암컷" ? true : false;
    const petData = {
      petName: selectedPet.petName,
      birthDate: selectedPet.birthDate,
      gender: genderBoolean,
      member: loggedInUser.id, // 현재 로그인된 사용자의 ID
    };

    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    if (selectedPet.profileImgUrl) {
      formData.append("profileImgUrl", selectedPet.profileImgUrl);
    }

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
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    const genderBoolean = newPet.gender === "암컷" ? true : false;
    const formData = new FormData();
    const petData = {
      petName: newPet.petName,
      birthDate: newPet.birthDate,
      gender: genderBoolean,
      member: loggedInUser.id, // 로그인된 사용자 ID 사용
    };

    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    if (newPet.profileImgUrl && newPet.profileImgUrl instanceof File) {
      formData.append("profileImgUrl", newPet.profileImgUrl);
    }

    fetch("http://localhost:8080/api/pets", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Add pet response:", response);
        if (!response.ok) {
          throw new Error(`Failed to add pet: ${response.status}`);
        }
        return response.json();
      })
      .then((createdPet) => {
        console.log("Created Pet:", createdPet);
        setPetList((prevList) => [...prevList, createdPet]);
        setShowAddModal(false);
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
        setPetList(petList.filter((pet) => pet.id !== petId));
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <Container className="profile-container mt-4">
      <Header />
      {petList.map((pet) => (
        <div key={pet.id} className="card-section">
          <Card>
            <Card.Body>
              <div className="info-section">
                <Button
                  className="card-button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedPet({
                      id: pet.id,
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
              <p>{`${pet.breed} | ${pet.birthDate} | ${
                pet.gender ? "암컷" : "수컷"
              }`}</p>
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
