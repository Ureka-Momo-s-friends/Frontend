import React, { useState } from "react";
import * as S from "./style";
import { XIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";

const BottomSheet = ({ onClose, productName, price }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;
  const navigate = useNavigate();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCartClick = () => {
    // 장바구니에 상품 추가
    const cartItem = {
      productName,
      price,
      quantity,
      totalPrice,
    };

    // 로컬 스토리지에 장바구니 데이터 저장
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert(`${productName}이(가) 장바구니에 추가되었습니다.`);

    // 장바구니 페이지로 이동
    navigate("/cart");
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
      </S.BtnWrapper>
    </S.BottomSheet>
  );
};

export default BottomSheet;
