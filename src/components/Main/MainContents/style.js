import styled from "@emotion/styled";

export const Layer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 56px;
`;

export const CategoryWrapper = styled.div`
  width: 73%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin: 24px 0;

  @media (max-width: 600px) {
    & > div {
      flex-basis: calc(50% - 32px);
    }
  }
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  div {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.03);
    background: rgba(0, 0, 0, 0.024);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    text-align: center;
  }
`;
