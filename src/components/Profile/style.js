import styled from "@emotion/styled";

// 프로필 페이지 전체 컨테이너 스타일
export const ProfileContainer = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

// 카드 섹션 스타일
export const CardSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

// 카드 스타일
export const StyledCard = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  padding: 15px;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: flex-start; // 위쪽 정렬
  justify-content: space-between; // 좌우 양끝 정렬
  gap: 20px; // 요소들 사이 간격
`;

// 프로필 이미지 스타일 (둥글게)
export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%; /* 둥글게 */
  object-fit: cover;
  margin-right: 15px;
`;

// 고양이 프로필 이미지 스타일 (둥글게)
export const PetProfileImage = styled.img`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
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

export const ProfileTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;
