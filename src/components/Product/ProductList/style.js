import styled from "@emotion/styled";

export const Layer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-bottom: 56px;
`;

export const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 12px;
`;

export const Item = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  h6 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
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
  font-weight: bold;
  margin-right: 4px;
`;

export const SalePrice = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;
