import styled from "@emotion/styled";

export const Layer = styled.div`
  max-width: 600px;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
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
  position: absolute;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
