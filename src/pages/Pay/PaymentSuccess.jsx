import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
      if (isPaymentSaved) return; // 이미 저장된 경우 함수 종료

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
          setIsPaymentSaved(true); // 데이터가 저장되었음을 표시

          // 결제 성공 시 장바구니 비우기
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
    navigate("/"); // 홈 페이지로 이동
  };

  const handleCancelPayment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pays/cancel/${paymentKey}`,
        {
          method: "POST",
        },
      );

      if (response.ok) {
        alert("결제가 성공적으로 취소되었습니다.");
        navigate("/"); // 결제 취소 후 홈으로 이동
      } else {
        alert("결제 취소에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 취소 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h1>결제 성공!</h1>
      <p>결제 키: {paymentKey}</p>
      <p>주문 ID: {orderId}</p>
      <p>결제 금액: {amount}원</p>
      <button onClick={handleGoHome}>홈으로 이동</button>
      <br />
      <button onClick={handleCancelPayment}>결제 취소</button>
    </div>
  );
};

export default PaymentSuccess;
