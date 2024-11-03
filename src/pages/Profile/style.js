import styled from "@emotion/styled";

// 프로필 페이지 전체 컨테이너 스타일
export const ProfileContainer = styled.div`
  background-color: #f5f5f5; /* 밝은 회색 배경 */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh; /* 화면 전체 높이를 채움 */
  display: flex;
  flex-direction: column;
`;

// 카드 섹션 스타일
export const CardSection = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

// 카드 스타일
export const StyledCard = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
  padding: 15px;
`;

// 카드 버튼 스타일 (더 진한 회색, 크기 조정)
export const CardButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 8px; /* 크기 줄이기 */
  font-size: 10px; /* 폰트 크기 조정 */
  border: none;
  border-radius: 5px;
  background-color: #666666; /* 더 진한 회색 */
  color: white;

  &:hover {
    background-color: #555555; /* 호버 시 색상 */
  }
`;

// 프로필 이미지 스타일 (둥글게)
export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 둥글게 */
  object-fit: cover;
  margin-right: 15px;
`;

// 고양이 프로필 이미지 스타일 (둥글게)
export const PetProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 둥글게 */
  object-fit: cover;
  margin-right: 15px;
`;

// 모달 이미지 스타일
export const ModalImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// 입력 필드 스타일
export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

// 저장 버튼 스타일
export const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
