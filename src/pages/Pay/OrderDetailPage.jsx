import React from "react";
import * as S from "./style";
import ProfileTitle from "components/Profile/ProfileContent/ProfileTitle";

function OrderDetail(props) {
  return (
    <>
      <S.PaymentListContainer>
        <ProfileTitle title={"주문 상세"} />
      </S.PaymentListContainer>
    </>
  );
}

export default OrderDetail;
