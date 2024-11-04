import styled from "@emotion/styled";

export const Layer = styled.div`
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
