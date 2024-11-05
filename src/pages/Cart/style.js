import styled from "@emotion/styled";

export const CartContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ProductName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const ProductQuantity = styled.span`
  font-size: 14px;
  color: #666;
`;

export const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

export const TotalPrice = styled.p`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const CheckoutButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;
