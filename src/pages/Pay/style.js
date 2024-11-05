import styled from "@emotion/styled";

// 기존 스타일
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  height: 100%;
  margin: 0 auto;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
`;

export const LoginButton = styled.button`
  background-color: #555;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #666;
  }
`;

// 추가된 스타일
export const PaymentContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

export const PaymentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const PaymentProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const PaymentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PaymentAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const PaymentStatus = styled.span`
  font-size: 14px;
  color: ${(props) => (props.status === "CANCELLED" ? "#ff4d4d" : "#28a745")};
`;

export const PaymentDate = styled.span`
  font-size: 12px;
  color: #666;
`;

export const PaymentAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const CardButton = styled.button`
  background-color: ${(props) =>
    props.variant === "cancel" ? "#ff4d4d" : "#007bff"};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#cc0000" : "#0056b3"};
  }
`;

export const StatusText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.status === "CANCELLED" ? "#ff4d4d" : "#28a745")};
`;
