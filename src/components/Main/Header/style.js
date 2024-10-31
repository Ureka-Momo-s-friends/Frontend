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
