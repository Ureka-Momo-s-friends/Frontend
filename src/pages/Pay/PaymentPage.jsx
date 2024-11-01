import React, { useEffect } from "react";
import { loadTossPayments } from "@tosspayments/sdk";

const PaymentPage = () => {
  useEffect(() => {
    // SDK 초기화
    const clientKey = "test_ck_N5OWRapdA8dbwLJy01BVo1zEqZKL";

    loadTossPayments(clientKey).then((tossPayments) => {
      window.requestPayment = () => {
        tossPayments.requestPayment("VIRTUAL_ACCOUNT", {
          amount: 50000,
          orderId: "j9MY0wNUn7G2Z1AisevQH",
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          customerMobilePhone: "01012341234",
          virtualAccount: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
            validHours: 24,
          },
        });
      };
    });
  }, []);

  return (
    <div>
      <button className="button" onClick={() => window.requestPayment()}>
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;
