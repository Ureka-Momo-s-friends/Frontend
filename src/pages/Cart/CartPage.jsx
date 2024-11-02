import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // navigate 훅 추가

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    // 결제 페이지로 이동하면서 장바구니 데이터를 전달
    navigate("/payment", { state: { cartItems, totalPrice } });
  };

  return (
    <div>
      <h1>장바구니</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <p>제품명: {item.productName}</p>
            <p>수량: {item.quantity}</p>
            <p>가격: {(item.price * item.quantity).toLocaleString()}원</p>
            <button onClick={() => handleRemoveItem(index)}>삭제</button>
          </div>
        ))
      )}
      <p>총 결제 금액: {totalPrice.toLocaleString()}원</p>
      <button onClick={handleCheckout}>결제하기</button>
    </div>
  );
};

export default CartPage;
