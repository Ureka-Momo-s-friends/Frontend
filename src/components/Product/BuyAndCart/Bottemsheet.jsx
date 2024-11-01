import React, { useState } from "react";
import * as S from "./style";
import { XIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";

const BottomSheet = ({ onClose, productName, price }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;
  const navigate = useNavigate(); //결제창으로

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCartClick = () => {
    navigate("/payment", {
      state: { productName, totalPrice, quantity },
    });
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
        <S.Button onClick={handleCartClick}>장바구니</S.Button>
        <S.Button>바로 구매</S.Button>
      </S.BtnWrapper>
    </S.BottomSheet>
  );
};

export default BottomSheet;
