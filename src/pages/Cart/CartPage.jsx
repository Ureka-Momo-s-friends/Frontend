import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // 로컬 스토리지에서 장바구니 항목 가져오기
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // 장바구니 목록이 변경되면 로컬 스토리지를 감시하여 업데이트
  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  // 장바구니에서 항목 삭제
  const handleRemoveItem = (index) => {
    const itemToRemove = cartItems[index]; // 필터링하기 전에 itemToRemove 저장

    if (!itemToRemove) {
      alert("삭제할 항목이 없습니다.");
      return;
    }

    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    alert(`${itemToRemove.productName}이(가) 장바구니에서 삭제되었습니다.`);
  };

  // 총 가격 계산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 결제 페이지로 이동
  const handleProceedToPayment = () => {
    if (cartItems.length > 0) {
      navigate("/payment", { state: { cartItems, totalPrice } });
    } else {
      alert("장바구니가 비어 있습니다.");
    }
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
      {cartItems.length > 0 && (
        <button onClick={handleProceedToPayment}>결제하기</button>
      )}
    </div>
  );
};

export default CartPage;
