import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style"; // 스타일을 위한 임포트
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const paymentKey = query.get("paymentKey");
  const orderId = query.get("orderId");
  const amount = query.get("amount");
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const savePaymentInfo = async () => {
      if (isPaymentSaved) return; // 이미 저장된 경우 리턴

      try {
        const address = localStorage.getItem("address") || "배송지 정보 없음";
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          "https://ureca-momo.store/api/orders/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberId: loggedInUser.id,
              address: address,
              paymentKey: paymentKey,
            }),
          },
        );

        if (isMounted && !isPaymentSaved) {
          // 마운트 상태와 저장 여부 다시 한번 체크
          if (response.ok) {
            // alert("주문 및 결제 정보가 저장되었습니다.");
            Swal.fire({
              icon: "success",
              title: "주문 및 결제 정보가 저장되었습니다.",
              showConfirmButton: false,
              timer: 1200,
            });
            setIsPaymentSaved(true);
            localStorage.removeItem("address");
          } else {
            console.error("주문 및 결제 정보 저장 실패");
            const errorDetails = await response.json();
            console.error("Error details:", errorDetails);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("주문 및 결제 정보 전송 중 오류:", error);
        }
      }
    };

    if (paymentKey && orderId && amount && !isPaymentSaved) {
      savePaymentInfo();
    }

    return () => {
      isMounted = false;
    };
  }, [paymentKey, orderId, amount, isPaymentSaved]); // isPaymentSaved 의존성 추가

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoHistory = () => {
    navigate("/history");
  };

  // 결제 취소 처리 함수
  const handleCancelPayment = async () => {
    try {
      const response = await fetch("https://ureca-momo.store/api/pays/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentKey: paymentKey }),
      });

      if (response.ok) {
        // alert("결제가 취소되었습니다.");
        Swal.fire({
          icon: "success",
          title: "결제가 취소되었습니다.",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate("/history"); // 결제 내역 페이지로 이동
      } else {
        const errorText = await response.text();
        console.error("결제 취소 실패:", errorText);
        Swal.fire({
          icon: "error",
          title: "주문 취소에 실패했습니다.",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    } catch (error) {
      console.error("결제 취소 요청 중 오류 발생:", error);
      Swal.fire({
        icon: "error",
        title: "주문 취소 중 오류가 발생했습니다.",
        showConfirmButton: false,
        timer: 1200,
      });
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
