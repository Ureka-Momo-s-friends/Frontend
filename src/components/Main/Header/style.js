import styled from "@emotion/styled";

export const Layer = styled.div`
  max-width: 600px;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;

  svg {
    position: absolute;
    cursor: pointer;
    left: 16px;
  }
  img {
    cursor: pointer;
  }
`;

export const HeaderTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0; /* 로고와 검색창 사이에 간격 추가 */
`;

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
`;

export const SearchBox = styled.div`
  display: flex;
  width: 90%;
  max-width: 600px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  input {
    flex-grow: 1;
    border: none;
    outline: none;
    padding-left: 16px;
    font-size: 14px;
    color: #333;
  }
`;

export const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  background-color: #555;
  color: white;
  cursor: pointer;
`; /* 검색 아이콘 이전 상태로 유지 */

export const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #555;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 16px;
  position: absolute; /* 우측 상단에 위치하도록 */
  top: 16px; /* 상단 간격 */
  right: 16px; /* 우측 간격 */
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px; /* 프로필 이미지 아래쪽에 위치 */
  right: 0;
  background: #333; /* 더 진한 색상으로 설정 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 0; /* 기본 패딩 제거 */
  z-index: 10;
`;

export const DropdownItem = styled.button`
  padding: 12px 16px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  text-align: center; /* 텍스트를 가로로 중앙 정렬 */
  width: 100%;
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 */
  &:hover {
    background: #555; /* 호버시 배경 색상 변경 */
  }
`;

export const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #555;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 16px;
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 0;
  z-index: 10;
`;

export const DropdownItem = styled.button`
  padding: 12px 16px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  text-align: center;
  width: 100%;
  white-space: nowrap;

  &:hover {
    background: #555;
  }
`;
