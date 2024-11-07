import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, Edit2, Check } from "lucide-react";
import * as S from "./style";

const CartItem = ({
  id,
  productId,
  image,
  name,
  price,
  salePrice,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  const navigate = useNavigate();

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  const discountRate = Math.round(((price - salePrice) / price) * 100);

  return (
    <S.CartItemWrapper>
      <S.ItemImage onClick={handleProductClick}>
        <img src={image} alt={name} />
      </S.ItemImage>

      <S.ItemContent>
        <S.ItemHeader>
          <div>
            <S.ItemName onClick={handleProductClick}>{name}</S.ItemName>
            <S.PriceContainer>
              <S.DiscountRate>{discountRate}%</S.DiscountRate>
              <S.ItemPrice>{(price * quantity).toLocaleString()}</S.ItemPrice>
              <S.ItemSalePrice>
                {(salePrice * quantity).toLocaleString()}원
              </S.ItemSalePrice>
            </S.PriceContainer>
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

  const totalSalePrice = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.amount,
    0,
  );
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0,
  );
  const totalDiscountRate = Math.round(
    ((totalOriginalPrice - totalSalePrice) / totalOriginalPrice) * 100,
  );

  const handlePurchase = () => {
    if (cartItems.length > 0 && address.trim()) {
      navigate("/payment", {
        state: { cartItems, totalPrice: totalSalePrice, address: address },
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
            productId={item.product.id}
            image={item.product.thumbnail}
            name={item.product.name}
            price={item.product.price}
            salePrice={item.product.salePrice}
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
              {cartItems.length > 0 && (
                <>
                  <S.DiscountRate>{totalDiscountRate}%</S.DiscountRate>
                  <S.TotalAmount>
                    {totalOriginalPrice.toLocaleString()}원
                  </S.TotalAmount>
                </>
              )}
              <S.TotalSaleAmount>
                {totalSalePrice.toLocaleString()}원
              </S.TotalSaleAmount>
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
