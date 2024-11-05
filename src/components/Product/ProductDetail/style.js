import styled from "@emotion/styled";

export const Layer = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Thumnail = styled.div`
  width: 100%;
  position: relative;
  ::before {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0.025);
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-border-radius: 14px;
    border-radius: 14px;
    z-index: 1;
  }
`;

export const Info = styled.div`
  padding: 16px;
  padding-bottom: 32px;
  border-bottom: 8px solid #ddd;
  div {
    display: flex;
    flex-direction: column;
  }
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #b0b0b0;
  text-decoration: line-through;
  margin-right: 4px;
`;

export const DiscountRate = styled.span`
  font-size: 18px;
  color: #ff4d4d;
  font-weight: 900;
  margin-right: 4px;
`;

export const SalePrice = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

export const Descripsion = styled.div`
  padding: 16px;
  margin-bottom: 140px;
`;
