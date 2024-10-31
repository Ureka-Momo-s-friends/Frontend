import React, { useState } from "react";
import * as S from "./style";
import { XIcon } from "assets/svgs";

const BottomSheet = ({ onClose, productName, price }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <S.BottomSheet>
      <S.SheetHeader>
        <S.Info>
          제품명: {productName}
          <span>{price.toLocaleString()}원</span>
        </S.Info>
        <S.QuantityControl>
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </S.QuantityControl>
        <XIcon onClick={onClose} />
      </S.SheetHeader>
      <S.PriceInfo>
        <p>총 상품 금액: {totalPrice.toLocaleString()}원</p>
      </S.PriceInfo>
      <S.BtnWrapper>
        <S.Button>장바구니</S.Button>
        <S.Button>바로 구매</S.Button>
      </S.BtnWrapper>
    </S.BottomSheet>
  );
};

export default BottomSheet;
