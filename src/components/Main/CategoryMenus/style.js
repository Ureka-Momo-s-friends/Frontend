import styled from "@emotion/styled";

export const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin: 24px 0;
  padding: 0 16px;

  & > div:nth-of-type(${(props) => props.activeid + 1}) {
    font-weight: 900;
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
  span {
    text-align: center;
  }
`;
