import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style"; // 스타일 파일 임포트

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const itemToRemove = cartItems[index];
    if (!itemToRemove) {
      alert("삭제할 항목이 없습니다.");
      return;
    }

    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    alert(`${itemToRemove.productName}이(가) 장바구니에서 삭제되었습니다.`);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleProceedToPayment = async () => {
    if (cartItems.length > 0) {
      navigate("/payment", { state: { cartItems, totalPrice } });
    } else {
      alert("장바구니가 비어 있습니다.");
    }
  };

  return (
    <S.CartContainer>
      <h1>장바구니</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        cartItems.map((item, index) => (
          <S.CartItem key={index}>
            <S.CartItemDetails>
              <S.ProductName>{item.productName}</S.ProductName>
              <S.ProductQuantity>수량: {item.quantity}</S.ProductQuantity>
              <S.ProductPrice>
                가격: {(item.price * item.quantity).toLocaleString()}원
              </S.ProductPrice>
            </S.CartItemDetails>
            <S.RemoveButton onClick={() => handleRemoveItem(index)}>
              삭제
            </S.RemoveButton>
          </S.CartItem>
        ))
      )}
      <S.TotalPrice>총 결제 금액: {totalPrice.toLocaleString()}원</S.TotalPrice>
      {cartItems.length > 0 && (
        <S.CheckoutButton onClick={handleProceedToPayment}>
          결제하기
        </S.CheckoutButton>
      )}
    </S.CartContainer>
  );
};

export default CartPage;
