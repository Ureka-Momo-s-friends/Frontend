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
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const address = localStorage.getItem("address") || "배송지 정보 없음";
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const zonecode = localStorage.getItem("zonecode") || 12345;

        // 요청 데이터 확인용 로그
        console.log("Request body:", {
          memberId: loggedInUser.id,
          paymentKey: paymentKey,
          address: address,
          addressDetail: "추가 주소 정보", // 이 부분도 필요하다면 적절한 값으로 변경
          zonecode: "우편번호", // 이 부분도 필요하다면 적절한 값으로 변경
          orderDetailRequestList: cartItems.map((item) => ({
            productId: item.productId,
            amount: item.amount,
          })),
        });

        const response = await fetch("http://localhost:8080/api/orders/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: loggedInUser.id,
            paymentKey: paymentKey,
            address: address,
            addressDetail: "추가 주소 정보", // 이 부분도 필요하다면 적절한 값으로 변경
            zonecode: parseInt(zonecode, 10), // zonecode를 정수로 변환하여 전송
            orderDetailRequestList: cartItems.map((item) => ({
              productId: item.productId,
              amount: item.amount,
            })),
          }),
        });

        if (response.ok) {
          alert("주문 및 결제 정보가 저장되었습니다.");
          setIsPaymentSaved(true);
          localStorage.removeItem("cart");
        } else {
          console.error("주문 및 결제 정보 저장 실패");
          const errorDetails = await response.json();
          console.error("Error details:", errorDetails); // 추가된 로그
        }
      } catch (error) {
        console.error("주문 및 결제 정보 전송 중 오류:", error);
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
        console.error("결제 취소 실패:", errorText);
        alert(`결제 취소 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("결제 취소 요청 중 오류 발생:", error);
      alert("결제 취소 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
