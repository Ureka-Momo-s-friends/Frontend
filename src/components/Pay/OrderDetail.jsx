import React, { useEffect, useState } from "react";
import * as S from "../../pages/Pay/style";
import ProfileTitle from "../Profile/ProfileContent/ProfileTitle";
import { ListGroup } from "react-bootstrap";

function OrderDetail({ orderNumber, order, onCancel }) {
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 주문 내역을 가져오는 함수
    const fetchOrderDetailData = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user")); // 로그인한 사용자 정보 가져오기
      const memberId = loggedInUser ? loggedInUser.id : null; // 사용자 ID 가져오기

      if (!memberId) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/${order.orderId}`, // memberId 쿼리 매개변수로 전달
        );
        if (!response.ok) throw new Error("주문 내역을 불러오는 중 오류 발생");

        const data = await response.json();
        setOrderDetailData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetailData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // 해당 주문 취소
  const handleCancelOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${order.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("취소완료"),
        },
      );

      if (response.ok) {
        alert("주문이 취소되었습니다.");
        onCancel(order.orderId);
      } else {
        alert("주문 취소에 실패했습니다.");
      }
    } catch (error) {
      console.error("주문 취소 중 오류 발생:", error);
      alert("주문 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.PaymentListContainer>
      <ProfileTitle title={"주문 상세"} />
      <S.CardSection>
        <S.StyledCard>
          <div className="info-section d-flex justify-content-between align-items-center">
            <h5 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              주문번호: {orderNumber}
            </h5>
            {order.orderStatus !== "취소완료" && (
              <S.CardButton onClick={handleCancelOrder}>
                주문 취소하기
              </S.CardButton>
            )}
          </div>
          <ListGroup variant="flush" className="mt-3">
            {orderDetailData.map((detail) => (
              <ListGroup.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <S.ThumbnailImage
                  src={detail.thumbnail}
                  alt="Product Thumbnail"
                />
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {detail.productName}
                  </p>
                  <p style={{ margin: 0, fontWeight: "medium" }}>
                    {detail.amount}
                    {"개"}
                  </p>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {detail.totalPrice}
                    {"원"}
                  </p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </S.StyledCard>
      </S.CardSection>
    </S.PaymentListContainer>
  );
}

export default OrderDetail;
