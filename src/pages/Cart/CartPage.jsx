import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    const itemToRemove = cartItems[index];

    fetch(`http://localhost:8080/api/carts/${itemToRemove.productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("장바구니 항목 삭제 실패");
        }
        alert("장바구니에서 항목이 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("장바구니 항목 삭제 중 오류 발생:", error);
        alert("장바구니 항목 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
