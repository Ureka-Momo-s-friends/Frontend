import React, { useState, useEffect } from "react";
import { Minus, Plus, X, Edit2, Check } from "lucide-react";

const styles = `
  .cart-container {
    width: 100%;
    padding: 0 16px;
    padding-bottom: 280px;
  }

  .cart-title {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 1rem 0;
  }

  .cart-item {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }

  .cart-item-image {
    width: 96px;
    height: 96px;
    flex-shrink: 0;
  }

  .cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cart-item-content {
    flex: 1;
    margin-left: 1rem;
  }

  .cart-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .cart-item-name {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0;
  }

  .cart-item-price {
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .quantity-button {
    padding: 0.5rem;
    border: 1px solid #666;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quantity-button:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }

  .quantity-button.minus {
    border-radius: 4px 0 0 4px;
  }

  .quantity-button.plus {
    border-radius: 0 4px 4px 0;
  }

  .quantity-display {
    padding: 0.25rem 1rem;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
  }

  .fixed-bottom-area {
    position: fixed;
    bottom: 56px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 600px;
    margin: 0 auto;
  }

  .cart-summary {
    padding: 16px 16px 0;
  }

  .cart-summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .cart-total {
    text-align: right;
  }

  .cart-total-label {
    font-weight: bold;
    margin: 0;
  }

  .cart-total-amount {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.25rem 0;
  }

  .address-section {
    padding: 0 16px;
  }

  .address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .address-label {
    font-weight: bold;
    color: #333;
  }

  .edit-button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

  .edit-button:hover {
    color: #333;
  }

  .address-content {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    min-height: 60px;
    line-height: 1.5;
    font-size: 14px;
  }

  .address-textarea {
    width: 100%;
    min-height: 60px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
    font-family: inherit;
  }

  .no-address {
    color: #999;
    font-size: 14px;
  }

  .purchase-button-container {
    padding: 0 16px 16px;
  }

  .purchase-button {
    width: 100%;
    padding: 1rem;
    background-color: #6263fb;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .purchase-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .purchase-button:hover:not(:disabled) {
    background-color: #5152ea;
  }

  .remove-button {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #666;
  }

  .remove-button:hover {
    color: #333;
  }
`;

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

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>

      <div className="cart-item-content">
        <div className="cart-item-header">
          <div>
            <h3 className="cart-item-name">{name}</h3>
            <p className="cart-item-price">
              {(price * quantity).toLocaleString()}원
            </p>
          </div>
          <button className="remove-button" onClick={handleRemove}>
            <X size={20} />
          </button>
        </div>

        <div className="quantity-control">
          <button
            onClick={handleDecrease}
            disabled={quantity === 1}
            className="quantity-button minus"
          >
            <Minus size={16} />
          </button>
          <div className="quantity-display">{quantity}</div>
          <button onClick={handleIncrease} className="quantity-button plus">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
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
    <div className="address-section">
      <div className="address-header">
        <span className="address-label">배송지</span>
        {isEditing ? (
          <button className="edit-button" onClick={handleSave}>
            <Check size={16} />
            완료
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} />
            {address ? "수정" : "입력"}
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="address-textarea"
          placeholder="배송지를 입력해주세요"
          value={tempAddress}
          onChange={(e) => setTempAddress(e.target.value)}
          autoFocus
        />
      ) : (
        <div className="address-content">
          {address ? (
            address
          ) : (
            <span className="no-address">배송지를 입력해주세요</span>
          )}
        </div>
      )}
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

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
          body: JSON.stringify({ amount: newAmount }),
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

  return (
    <>
      <style>{styles}</style>
      <div className="cart-container">
        <h2 className="cart-title">장바구니</h2>

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
      </div>

      <div className="fixed-bottom-area">
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span className="free-delivery">전 상품 무료배송!</span>
            <div className="cart-total">
              <p className="cart-total-label">총 결제액</p>
              <p className="cart-total-amount">{total.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        <AddressSection address={address} onAddressChange={setAddress} />

        <div className="purchase-button-container">
          <button
            className="purchase-button"
            disabled={!address.trim() || cartItems.length === 0}
          >
            구매하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
