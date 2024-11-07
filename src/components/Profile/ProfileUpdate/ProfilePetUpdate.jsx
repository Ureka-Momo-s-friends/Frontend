import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import * as S from "../style";
import ProfileTitle from "../ProfileContent/ProfileTitle";

function ProfilePetUpdate() {
  const [petList, setPetList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState({
    id: null,
    petName: "",
    breed: "",
    birthDate: "",
    gender: "",
    profileImg: null,
  });

  // 초기 상태를 객체로 정의
  const initialPetState = {
    petName: "",
    birthDate: "",
    breed: "",
    gender: "암컷",
    profileImg: null,
  };

  const [newPet, setNewPet] = useState(initialPetState);

  // 모달 닫기 함수
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewPet(initialPetState); // 모달을 닫을 때 newPet 상태를 초기화
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  const fetchPetList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.id) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    // API 호출을 통해 해당 사용자의 고양이 데이터 불러오기
    fetch(`https://ureca-momo.store/api/pets/member/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
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

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setSelectedPet({ ...selectedPet, profileImg: file });
    } else {
      setNewPet({ ...newPet, profileImg: file });
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
      breed: selectedPet.breed,
      birthDate: selectedPet.birthDate,
      gender: genderBoolean,
      member: loggedInUser.id,
    };

    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    if (selectedPet.profileImg && selectedPet.profileImg instanceof File) {
      formData.append("profileImg", selectedPet.profileImg);
    }

    // API 호출을 통해 고양이 정보 업데이트
    fetch(`https://ureca-momo.store/api/pets/${selectedPet.id}`, {
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
        fetchPetList();
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
      breed: newPet.breed,
      birthDate: newPet.birthDate,
      gender: genderBoolean,
      memberId: loggedInUser.id,
    };

    formData.append(
      "petData",
      new Blob([JSON.stringify(petData)], { type: "application/json" }),
    );

    if (newPet.profileImg && newPet.profileImg instanceof File) {
      formData.append("profileImg", newPet.profileImg);
    }

    // API 호출을 통해 새로운 고양이 추가
    fetch("https://ureca-momo.store/api/pets", {
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
        fetchPetList();
        handleCloseAddModal(); // setShowAddModal(false) 대신 handleCloseAddModal 사용
      })
      .catch((error) => {
        console.error("Error adding pet:", error);
      });
  };

  const handleDeletePet = (petId) => {
    fetch(`https://ureca-momo.store/api/pets/${petId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete pet");
        }
        fetchPetList();
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <S.ProfileContainer>
      <ProfileTitle title={"우리집 냥이들"} />
      {petList.map((pet) => (
        <S.CardSection key={pet.id}>
          <S.StyledCard>
            <S.Card>
              <Row>
                <Col xs={3}>
                  <S.PetProfileImage
                    src={
                      pet.profileImg ? pet.profileImg : "/img/default-cat.png"
                    }
                    alt="Pet Profile"
                    className="img-fluid"
                  />
                </Col>
                <Col xs={9}>
                  <div className="info-section d-flex justify-content-between align-items-center">
                    <h6>{`${pet.petName}`}</h6>
                    <S.CardButton
                      onClick={() => {
                        setSelectedPet({
                          id: pet.id,
                          petName: pet.petName,
                          birthDate: pet.birthDate,
                          breed: pet.breed,
                          gender: pet.gender ? "암컷" : "수컷",
                          profileImg: null,
                        });
                        setShowEditModal(true);
                      }}
                    >
                      수정
                    </S.CardButton>
                  </div>
                  <p>{`${pet.breed || "종 알 수 없음"} | ${pet.birthDate || "생일 미상"} | ${
                    pet.gender ? "암컷" : "수컷"
                  }`}</p>
                  <div className="mt-3">
                    <span
                      onClick={() => handleDeletePet(pet.id)}
                      style={{ cursor: "pointer", color: "#ff0000" }}
                    >
                      삭제하기
                    </span>
                  </div>
                </Col>
              </Row>
            </S.Card>
          </S.StyledCard>
        </S.CardSection>
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
              <Form.Label className="required">이름</Form.Label>
              <Form.Control
                type="text"
                value={selectedPet.petName}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, petName: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formPetBreed" className="mt-3">
              <Form.Label>종</Form.Label>
              <Form.Control
                as="select"
                value={selectedPet.breed}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, breed: e.target.value })
                }
              >
                <option value="">종 선택</option>
                <option value="네바 마스커레이드">네바 마스커레이드</option>
                <option value="노르웨이 숲">노르웨이 숲</option>
                <option value="라가머핀">라가머핀</option>
                <option value="라팜">라팜</option>
                <option value="랙돌">랙돌</option>
                <option value="메인쿤">메인쿤</option>
                <option value="버만">버만</option>
                <option value="샤르트뢰">샤르트뢰</option>
                <option value="셀커크 렉스">셀커크 렉스</option>
                <option value="소말리">소말리</option>
                <option value="스코티시 스트레이트">스코티시 스트레이트</option>
                <option value="스코티시 폴드">스코티시 폴드</option>
                <option value="아비시니안">아비시니안</option>
                <option value="엑조틱 숏헤어">엑조틱 숏헤어</option>
                <option value="재패니즈 밥테일">재패니즈 밥테일</option>
                <option value="코니시 렉스">코니시 렉스</option>
                <option value="아메리칸 밥테일">아메리칸 밥테일</option>
                <option value="아메리칸 숏헤어">아메리칸 숏헤어</option>
                <option value="아메리칸 와이어헤어">아메리칸 와이어헤어</option>
                <option value="아메리칸 컬">아메리칸 컬</option>
                <option value="아시안">아시안</option>
                <option value="오리엔탈">오리엔탈</option>
                <option value="오스트레일리안 미스트">
                  오스트레일리안 미스트
                </option>
                <option value="오시캣">오시캣</option>
                <option value="이집션 마우">이집션 마우</option>
                <option value="저먼 렉스">저먼 렉스</option>
                <option value="카오 마니">카오 마니</option>
                <option value="코니시 렉스">코니시 렉스</option>
                <option value="코랏">코랏</option>
                <option value="쿠리리안 밥테일">쿠리리안 밥테일</option>
                <option value="타이">타이</option>
                <option value="톤키니즈">톤키니즈</option>
              </Form.Control>
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
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>고양이 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPet}>
            <Form.Group controlId="formNewPetName">
              <Form.Label className="required">이름</Form.Label>
              <Form.Control
                type="text"
                value={newPet.petName}
                onChange={(e) =>
                  setNewPet({ ...newPet, petName: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewPetBreed" className="mt-3">
              <Form.Label>종</Form.Label>
              <Form.Control
                as="select"
                value={newPet.breed}
                onChange={(e) =>
                  setNewPet({ ...newPet, breed: e.target.value })
                }
              >
                <option value="">종 선택</option>
                <option value="네바 마스커레이드">네바 마스커레이드</option>
                <option value="노르웨이 숲">노르웨이 숲</option>
                <option value="라가머핀">라가머핀</option>
                <option value="라팜">라팜</option>
                <option value="랙돌">랙돌</option>
                <option value="메인쿤">메인쿤</option>
                <option value="버만">버만</option>
                <option value="샤르트뢰">샤르트뢰</option>
                <option value="셀커크 렉스">셀커크 렉스</option>
                <option value="소말리">소말리</option>
                <option value="스코티시 스트레이트">스코티시 스트레이트</option>
                <option value="스코티시 폴드">스코티시 폴드</option>
                <option value="아비시니안">아비시니안</option>
                <option value="엑조틱 숏헤어">엑조틱 숏헤어</option>
                <option value="재패니즈 밥테일">재패니즈 밥테일</option>
                <option value="코니시 렉스">코니시 렉스</option>
                <option value="아메리칸 밥테일">아메리칸 밥테일</option>
                <option value="아메리칸 숏헤어">아메리칸 숏헤어</option>
                <option value="아메리칸 와이어헤어">아메리칸 와이어헤어</option>
                <option value="아메리칸 컬">아메리칸 컬</option>
                <option value="아시안">아시안</option>
                <option value="오리엔탈">오리엔탈</option>
                <option value="오스트레일리안 미스트">
                  오스트레일리안 미스트
                </option>
                <option value="오시캣">오시캣</option>
                <option value="이집션 마우">이집션 마우</option>
                <option value="저먼 렉스">저먼 렉스</option>
                <option value="카오 마니">카오 마니</option>
                <option value="코니시 렉스">코니시 렉스</option>
                <option value="코랏">코랏</option>
                <option value="쿠리리안 밥테일">쿠리리안 밥테일</option>
                <option value="타이">타이</option>
                <option value="톤키니즈">톤키니즈</option>
              </Form.Control>
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
    </S.ProfileContainer>
  );
}

export default ProfilePetUpdate;
