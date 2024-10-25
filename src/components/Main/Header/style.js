import styled from '@emotion/styled';

export const Layer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;

export const SearchBox = styled.div`
  display: flex;
  width: 90%;
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
`;
