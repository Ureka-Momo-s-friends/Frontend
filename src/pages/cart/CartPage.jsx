import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, Edit2, Check } from "lucide-react";
import * as S from "./style";

const CartItem = ({
  id,
  image,
  name,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <S.CartItemWrapper>
      <S.ItemImage>
        <img src={image} alt={name} />
      </S.ItemImage>

      <S.ItemContent>
        <S.ItemHeader>
          <div>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{(price * quantity).toLocaleString()}원</S.ItemPrice>
          </div>
          <S.RemoveButton onClick={() => onRemove(id)}>
            <X size={20} />
          </S.RemoveButton>
        </S.ItemHeader>

        <S.QuantityControl>
          <S.QuantityButton
            onClick={handleDecrease}
            disabled={quantity === 1}
            className="minus"
          >
            <Minus size={16} />
          </S.QuantityButton>
          <S.QuantityDisplay>{quantity}</S.QuantityDisplay>
          <S.QuantityButton onClick={handleIncrease} className="plus">
            <Plus size={16} />
          </S.QuantityButton>
        </S.QuantityControl>
      </S.ItemContent>
    </S.CartItemWrapper>
  );
};

const AddressSection = ({ address, onAddressChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const handleSave = () => {
    onAddressChange(tempAddress);
    setIsEditing(false);
  };

  return (
    <S.AddressSection>
      <S.AddressHeader>
        <S.AddressLabel>배송지</S.AddressLabel>
        {isEditing ? (
          <S.EditButton onClick={handleSave}>
            <Check size={16} />
            완료
          </S.EditButton>
        ) : (
          <S.EditButton onClick={() => setIsEditing(true)}>
            <Edit2 size={16} />
            {address ? "수정" : "입력"}
          </S.EditButton>
        )}
      </S.AddressHeader>

      {isEditing ? (
        <S.AddressTextarea
          placeholder="배송지를 입력해주세요"
          value={tempAddress}
          onChange={(e) => setTempAddress(e.target.value)}
          autoFocus
        />
      ) : (
        <S.AddressContent>
          {address ? address : <S.NoAddress>배송지를 입력해주세요</S.NoAddress>}
        </S.AddressContent>
      )}
    </S.AddressSection>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/carts/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw new Error("Failed to fetch cart");
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleUpdateQuantity = async (cartId, newAmount) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAmount),
        },
      );
      if (!response.ok) throw new Error("Failed to update cart");

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, amount: newAmount } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cartId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to delete cart item");

      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0,
  );

  const handlePurchase = () => {
    if (cartItems.length > 0 && address.trim()) {
      navigate("/payment", {
        state: { cartItems, totalPrice: total },
      });
    } else {
      alert("주소를 입력하고 장바구니에 상품을 추가해주세요.");
    }
  };

  return (
    <S.CartWrapper>
      <S.CartTitle>장바구니</S.CartTitle>

      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.product.thumbnail}
            name={item.product.name}
            price={item.product.price}
            quantity={item.amount}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

      <S.FixedBottomArea>
        <S.CartSummary>
          <S.SummaryRow>
            <span>전 상품 무료배송!</span>
            <S.CartTotal>
              <S.TotalLabel>총 결제액</S.TotalLabel>
              <S.TotalAmount>{total.toLocaleString()}원</S.TotalAmount>
            </S.CartTotal>
          </S.SummaryRow>
        </S.CartSummary>

        <AddressSection address={address} onAddressChange={setAddress} />

        <S.PurchaseButtonContainer>
          <S.PurchaseButton
            disabled={!address.trim() || cartItems.length === 0}
            onClick={handlePurchase}
          >
            구매하기
          </S.PurchaseButton>
        </S.PurchaseButtonContainer>
      </S.FixedBottomArea>
    </S.CartWrapper>
  );
};

export default Cart;
