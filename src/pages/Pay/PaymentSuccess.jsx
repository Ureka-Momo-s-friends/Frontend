// PaymentSuccess.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paymentKey = query.get("paymentKey");
  const orderId = query.get("orderId");
  const amount = query.get("amount");

  return (
    <div>
      <h1>결제 성공!</h1>
      <p>결제 키: {paymentKey}</p>
      <p>주문 ID: {orderId}</p>
      <p>결제 금액: {amount}</p>
    </div>
  );
};

export default PaymentSuccess;
