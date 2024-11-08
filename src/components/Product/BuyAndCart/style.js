import styled from "@emotion/styled";

export const Layer = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  padding: 16px;
  padding-bottom: 72px;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  flex-grow: 1;
  height: 3rem;
  color: white;
  background-color: #6263fb;
  font-size: 16px;
  border-radius: 8px;
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  background: #fff;
  border-top: 1px solid #ddd;
  z-index: 20;

  animation: slide-up 0.3s ease-out;
  @keyframes slide-up {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0);
    }
  }
`;

export const SheetHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-right: 40px;
  svg {
    cursor: pointer;
    position: absolute;
    right: 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: #b0b0b0;
    font-size: 14px;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 32px;
    height: 32px;
    font-size: 18px;
    cursor: pointer;
  }
  span {
    font-size: 18px;
    font-weight: bold;
    margin: 0 12px;
  }
`;

export const PriceInfo = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.45);
`;
