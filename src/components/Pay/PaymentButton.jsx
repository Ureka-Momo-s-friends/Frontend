// PaymentButton.jsx
import { loadTossPayments } from "@tosspayments/sdk";

const PaymentButton = () => {
  const handlePayment = () => {
    loadTossPayments("your_client_key").then((tossPayments) => {
      tossPayments.requestPayment("카드", {
        amount: 1000, // 결제 금액
        orderId: "order-id", // 주문 ID
        orderName: "테스트 결제", // 주문 이름
        customerName: "홍길동",
        successUrl: "http://localhost:3000/payment/success",
        failUrl: "http://localhost:3000/payment/fail",
      });
    });
  };

  return <button onClick={handlePayment}>결제하기</button>;
};

export default PaymentButton;
