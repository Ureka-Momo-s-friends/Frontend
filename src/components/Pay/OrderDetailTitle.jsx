import React from "react";
import * as S from "../Profile/style";
import { BackArrowIcon } from "assets/svgs";

const OrderDetailTitle = ({ title, onBack }) => {
  return (
    <S.ProfileTitle>
      <BackArrowIcon onClick={onBack} style={{ cursor: "pointer" }} />
      {title}
    </S.ProfileTitle>
  );
};

export default OrderDetailTitle;
