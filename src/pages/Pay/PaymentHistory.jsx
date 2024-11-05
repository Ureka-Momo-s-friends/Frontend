import React, { useState, useEffect } from "react";
import * as S from "./style"; // 스타일 모듈 임포트
import Bottombar from "components/Main/Bottombar";
import Header from "components/Main/Header";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 결제 내역을 가져오는 함수
    fetch("http://localhost:8080/api/pays/all")
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setError("결제 내역을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 결제 취소 함수
  const handleCancelPayment = (paymentKey) => {
    fetch(`http://localhost:8080/api/pays/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey }),
    })
      .then((response) => {
        if (response.ok) {
          alert("결제가 취소되었습니다.");
          setPaymentData((prevData) =>
            prevData.map((payment) =>
              payment.paymentKey === paymentKey
                ? { ...payment, status: "CANCELLED" }
                : payment,
            ),
          );
        } else {
          console.error("결제 취소 실패");
          alert("결제 취소에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("결제 취소 중 오류 발생:", error);
        alert("결제 취소 중 오류가 발생했습니다.");
      });
  };

  // 결제 삭제 함수 (옵션)
  const handleDeletePayment = (paymentKey) => {
    if (!paymentKey) {
      alert("결제 키가 올바르지 않습니다.");
      return;
    }

    fetch(`http://localhost:8080/api/pays/delete/${paymentKey}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("결제 정보가 성공적으로 삭제되었습니다.");
          // 결제 내역 목록 갱신
          setPaymentData((prevData) =>
            prevData.filter((payment) => payment.paymentKey !== paymentKey),
          );
        } else {
          alert("결제 정보 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("결제 삭제 중 오류 발생:", error);
        alert("결제 삭제 중 오류가 발생했습니다.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <S.PaymentListContainer>
        <Header /> {/* 헤더 추가 */}
        <h2>결제 내역</h2>
        {paymentData.length === 0 ? (
          <p>결제 내역이 없습니다.</p>
        ) : (
          paymentData.map((payment) => (
            <S.PaymentCard key={payment.pay_id}>
              <S.PaymentDetails>
                {/* 상품명 표시 */}
                <S.PaymentProductName>
                  {payment.orders?.orderName || "상품명 정보 없음"}
                </S.PaymentProductName>
                {/* 상태에 따라 금액 앞에 기호 추가 */}
                <S.PaymentAmount>
                  {payment.status === "SUCCESS"
                    ? `- ${payment.amount}원`
                    : payment.status === "CANCELLED"
                      ? `+ ${payment.amount}원`
                      : `${payment.amount}원`}
                </S.PaymentAmount>
                <S.PaymentStatus status={payment.status}>
                  {payment.status}
                </S.PaymentStatus>
                <S.PaymentDate>
                  {new Date(payment.paymentDate).toLocaleString()}
                </S.PaymentDate>
              </S.PaymentDetails>
              <S.PaymentAction>
                {payment.status === "SUCCESS" && (
                  <S.CardButton
                    variant="cancel"
                    onClick={() => handleCancelPayment(payment.paymentKey)}
                  >
                    취소
                  </S.CardButton>
                )}
                <S.CardButton
                  variant="delete"
                  onClick={() => handleDeletePayment(payment.paymentKey)}
                >
                  삭제
                </S.CardButton>
              </S.PaymentAction>
            </S.PaymentCard>
          ))
        )}
        <Bottombar /> {/* 바텀바 추가 */}
      </S.PaymentListContainer>
    </>
  );
};

export default PaymentHistory;
