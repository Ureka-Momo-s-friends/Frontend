import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style"; // 스타일을 위한 임포트

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const paymentKey = query.get("paymentKey");
  const orderId = query.get("orderId");
  const amount = query.get("amount");
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);

  useEffect(() => {
    const savePaymentInfo = async () => {
      if (isPaymentSaved) return;

      try {
        const response = await fetch("http://localhost:8080/api/pays/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(amount, 10),
            paymentKey: paymentKey,
            status: "SUCCESS",
            orderId: orderId,
          }),
        });

        if (response.ok) {
          alert("결제 정보가 저장되었습니다.");
          setIsPaymentSaved(true);
          localStorage.removeItem("cart");
        } else {
          console.error("결제 정보 저장 실패");
        }
      } catch (error) {
        console.error("결제 정보 전송 중 오류:", error);
      }
    };

    if (paymentKey && orderId && amount && !isPaymentSaved) {
      savePaymentInfo();
    }
  }, [paymentKey, orderId, amount, isPaymentSaved]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoHistory = () => {
    navigate("/history");
  };

  // 결제 취소 처리 함수
  const handleCancelPayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pays/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentKey: paymentKey }),
      });

      if (response.ok) {
        alert("결제가 취소되었습니다.");
        navigate("/history"); // 결제 내역 페이지로 이동
      } else {
        const errorText = await response.text();
        alert(`결제 취소 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("결제 취소 요청 중 오류:", error);
    }
  };

  return (
    <S.Wrapper>
      <S.ModalContent>
        <h1>결제 성공!</h1>
        <p>결제가 성공적으로 완료되었습니다.</p>
        <p>결제 금액: {amount}원</p>
        <S.LoginButton onClick={handleGoHome}>홈으로 이동</S.LoginButton>
        <S.LoginButton onClick={handleGoHistory}>결제 내역</S.LoginButton>
        <S.LoginButton onClick={handleCancelPayment}>결제 취소</S.LoginButton>
      </S.ModalContent>
    </S.Wrapper>
  );
};

export default PaymentSuccess;
