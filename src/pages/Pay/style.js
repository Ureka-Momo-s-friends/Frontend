import styled from "@emotion/styled";

// 기존 스타일 유지

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

// 전체 결제 내역 컨테이너 스타일
export const PaymentContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 600px; /* 가로 600px */
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

// 결제 내역 카드 스타일
export const PaymentCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 16px;
  width: 100%; /* 가로를 부모 컨테이너에 맞춤 */
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// 카드 버튼 스타일 (결제 내역 상세 보기 등)
export const CardButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 12px;
  width: 100%; /* 부모의 너비를 따라감 */
  &:hover {
    background-color: #0056b3;
  }
`;

// 상태 텍스트 스타일 (성공, 취소 등)
export const StatusText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.status === "CANCELLED" ? "#ff4d4d" : "#28a745")};
`;
