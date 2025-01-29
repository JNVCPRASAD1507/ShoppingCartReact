import React, { useState } from "react";

const Card = ({ data, addToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...data, quantity });
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={data.mobileImage} alt={data.name} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{data.name}</h2>
        <p className="card-category">${data.price}</p>

        {/* Quantity Controls */}
        <div className="quantity-controls">
          <button onClick={handleDecrement} className="quantity-btn">
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button onClick={handleIncrement} className="quantity-btn">
            +
          </button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add
        </button>
      </div>
    </div>
  );
};

export default Card;
