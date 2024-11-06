import styled from "@emotion/styled";

export const CartWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
  padding-bottom: 280px;
`;

export const CartTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem 0;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

export const ItemImage = styled.div`
  width: 96px;
  height: 96px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
`;

export const ItemPrice = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const QuantityButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #666;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }

  &.minus {
    border-radius: 4px 0 0 4px;
  }

  &.plus {
    border-radius: 0 4px 4px 0;
  }
`;

export const QuantityDisplay = styled.div`
  padding: 0.25rem 1rem;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
`;

export const FixedBottomArea = styled.div`
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 600px;
  margin: 0 auto;
`;

export const CartSummary = styled.div`
  padding: 16px 16px 0;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CartTotal = styled.div`
  text-align: right;
`;

export const TotalLabel = styled.p`
  font-weight: bold;
  margin: 0;
`;

export const TotalAmount = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.25rem 0;
`;

export const AddressSection = styled.div`
  padding: 0 16px;
`;

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const AddressLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  &:hover {
    color: #333;
  }
`;

export const AddressContent = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  min-height: 60px;
  line-height: 1.5;
  font-size: 14px;
`;

export const AddressTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
`;

export const NoAddress = styled.span`
  color: #999;
  font-size: 14px;
`;

export const PurchaseButtonContainer = styled.div`
  padding: 0 16px 16px;
`;

export const PurchaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6263fb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #5152ea;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;
