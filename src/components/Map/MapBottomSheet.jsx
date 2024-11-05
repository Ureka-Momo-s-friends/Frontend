import React from "react";
import styled from "@emotion/styled";

const BottomSheetContainer = styled.div`
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.45);
`;

const BottomSheet = ({ message, onClose }) => (
  <>
    <Overlay onClick={onClose} />
    <BottomSheetContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{message}</span>
        <button onClick={onClose}>닫기</button>
      </div>
    </BottomSheetContainer>
  </>
);

export default BottomSheet;
