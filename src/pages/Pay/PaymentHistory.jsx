import React, { useState, useEffect } from "react";
import * as S from "./style"; // 스타일 모듈 임포트

const PaymentHistory = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 주문 내역을 가져오는 함수
    const fetchOrderData = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user")); // 로그인한 사용자 정보 가져오기
      const memberId = loggedInUser ? loggedInUser.id : null; // 사용자 ID 가져오기

      if (!memberId) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://ureca-momo.store/api/orders?memberId=${memberId}`, // memberId 쿼리 매개변수로 전달
        );
        if (!response.ok) throw new Error("주문 내역을 불러오는 중 오류 발생");

        const data = await response.json();
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // 결제 취소 함수
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://ureca-momo.store/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("취소완료"), // 요청 본문에 상태를 포함
        },
      );

      if (response.ok) {
        alert("주문이 취소되었습니다.");
        setOrderData((prevData) =>
          prevData.map((order) =>
            order.orderId === orderId
              ? { ...order, orderStatus: "취소완료" }
              : order,
          ),
        );
      } else {
        alert("주문 취소에 실패했습니다.");
      }
    } catch (error) {
      console.error("주문 취소 중 오류 발생:", error);
      alert("주문 취소 중 오류가 발생했습니다.");
    }
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
        <h2>주문 내역</h2>
        {orderData.length === 0 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          orderData.map((order) => (
            <S.PaymentCard key={order.orderId}>
              <S.PaymentDetails>
                <S.PaymentProductName>
                  {order.orderName || "상품명 정보 없음"}
                </S.PaymentProductName>
                <S.PaymentAmount>
                  {order.amount
                    ? order.amount.toLocaleString() + "원"
                    : "금액 정보 없음"}
                </S.PaymentAmount>
                <S.PaymentStatus status={order.orderStatus}>
                  {order.orderStatus || "상태 정보 없음"}
                </S.PaymentStatus>
                <S.PaymentDate>
                  {order.orderTime
                    ? new Date(order.orderTime).toLocaleString()
                    : "날짜 정보 없음"}
                </S.PaymentDate>
              </S.PaymentDetails>
              <S.PaymentAction>
                {order.orderStatus === "취소완료" ? (
                  ""
                ) : (
                  <S.CardButton
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    취소
                  </S.CardButton>
                )}
              </S.PaymentAction>
            </S.PaymentCard>
          ))
        )}
      </S.PaymentListContainer>
    </>
  );
};

export default PaymentHistory;
