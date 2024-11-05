import React, { useState, useEffect } from "react";
import * as S from "./style";
import { XIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";

const BottomSheet = ({ onClose, productName, price, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;
  const navigate = useNavigate();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCartClick = async () => {
    // 로그인 체크
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            amount: quantity,
            productId: parseInt(productId, 10),
          }),
        },
      ).then((res) => {
        console.log("Response Status:", res.status);
        console.log("Response Headers:", Object.fromEntries(res.headers));
        return res;
      });

      if (!response.ok) {
        // 에러 응답 상세 정보 로깅
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(
          `Failed to add item to cart: ${response.status} ${errorText}`,
        );
      }

      const result = await response.json();
      console.log("Success Response:", result);

      alert("장바구니에 추가되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error Details:", {
        message: error.message,
        stack: error.stack,
      });

      // 서버 연결 실패 시 좀 더 명확한 에러 메시지
      if (error.message.includes("Failed to fetch")) {
        alert("서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.");
      } else {
        alert(`장바구니 추가 실패: ${error.message}`);
      }
    }
  };

  // props 디버깅을 위한 로깅
  useEffect(() => {
    console.log("BottomSheet Props:", {
      productName,
      price,
      productId,
      userId,
    });
  }, [productName, price, productId, userId]);

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
        <S.Button onClick={handleCartClick}>장바구니</S.Button>
      </S.BtnWrapper>
    </S.BottomSheet>
  );
};

export default BottomSheet;
