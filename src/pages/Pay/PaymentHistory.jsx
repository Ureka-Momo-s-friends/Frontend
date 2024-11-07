import React, { useState, useEffect } from "react";
import * as S from "./style"; // 스타일 모듈 임포트
import { NoResults } from "../../components/Product/Search/style.js";
import ProfileTitle from "components/Profile/ProfileContent/ProfileTitle";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import OrderDetail from "components/Pay/OrderDetail";

const PaymentHistory = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // LocalDateTime 문자열을 받아서 원하는 형식으로 변환하는 함수
  const formatOrderNumber = (orderTime, orderId) => {
    const date = new Date(orderTime);

    // 년도 뒤 2자리
    const year = date.getFullYear().toString().slice(-2);

    // 월 (2자리로 패딩)
    const month = String(date.getMonth() + 1).padStart(2, "0");

    // 일 (2자리로 패딩)
    const day = String(date.getDate()).padStart(2, "0");

    // 시간 (2자리로 패딩)
    const hour = String(date.getHours()).padStart(2, "0");

    // 분 (2자리로 패딩)
    const minute = String(date.getMinutes()).padStart(2, "0");

    // orderId를 4자리로 패딩
    const paddedOrderId = String(orderId).padStart(4, "0");

    // 최종 주문번호 조합
    return `${year}${month}${day}${hour}${minute}-${paddedOrderId}`;
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCancelSuccess = (orderId) => {
    setOrderData((prevData) =>
      prevData.map((order) =>
        order.orderId === orderId
          ? { ...order, orderStatus: "취소완료" }
          : order,
      ),
    );
    setSelectedOrder(null); // 상세 화면 닫기
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (selectedOrder) {
    return (
      <OrderDetail
        orderNumber={formatOrderNumber(
          selectedOrder.orderTime,
          selectedOrder.orderId,
        )}
        order={selectedOrder}
        onCancel={handleCancelSuccess}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <>
      <S.PaymentListContainer>
        <ProfileTitle title={"주문 내역"} />
        {orderData.length === 0 ? (
          <NoResults>주문 내역이 없습니다.</NoResults>
        ) : (
          orderData.map((order) => (
            <S.PaymentCard key={order.orderId}>
              <S.PaymentDetails>
                <S.PaymentDate>
                  {"주문번호 "}
                  {formatOrderNumber(order.orderTime, order.orderId)}
                </S.PaymentDate>
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
              <S.IconContainer onClick={() => handleCardClick(order)}>
                <MdOutlineArrowForwardIos size={24} />
              </S.IconContainer>
            </S.PaymentCard>
          ))
        )}
      </S.PaymentListContainer>
    </>
  );
};

export default PaymentHistory;
