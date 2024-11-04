import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "./style"; // 스타일 모듈 임포트

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <S.PaymentContainer>
      <h2>결제 내역</h2>
      {paymentData.length === 0 ? (
        <p>결제 내역이 없습니다.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>결제 금액</th>
              <th>상태</th>
              <th>결제 일시</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr key={payment.pay_id}>
                <td>{index + 1}</td>
                <td>{payment.amount}원</td>
                <td>
                  <S.StatusText status={payment.status}>
                    {payment.status}
                  </S.StatusText>
                </td>
                <td>{payment.created_at || "Invalid Date"}</td>
                <td>
                  {payment.status === "SUCCESS" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancelPayment(payment.paymentKey)}
                    >
                      취소
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button variant="secondary" onClick={() => (window.location.href = "/")}>
        홈으로
      </Button>
    </S.PaymentContainer>
  );
};

export default PaymentHistory;
