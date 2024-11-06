import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/sdk";

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems, totalPrice, address } = location.state || {
    cartItems: [],
    totalPrice: 0,
    address: "",
  };

  useEffect(() => {
    if (address) {
      localStorage.setItem("address", address);
    }

    const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
    loadTossPayments(clientKey).then((tossPayments) => {
      const orderName =
        cartItems.length > 1
          ? `${cartItems[0].product.name} 외 ${cartItems.length - 1}건`
          : cartItems[0].product.name;

      tossPayments.requestPayment("카드", {
        amount: totalPrice,
        orderId: "order-id-" + new Date().getTime(),
        orderName: orderName,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      });
    });
  }, [cartItems, totalPrice, address]);

  return (
    <div>
      <h1>결제 진행 중...</h1>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default PaymentPage;
