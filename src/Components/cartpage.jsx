import React from "react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, updateQuantity, removeItem }) => {
  // Calculate the overall total price
  const overallTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Link to="/" className="back-to-store-btn">
        ⬅ Back To Home
      </Link>

      <h1>Your Cart </h1>

      {cart.length > 0 ? (
        <>
          {/* Cart Table */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.mobileImage}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    {/* Increment/Decrement Buttons */}
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Overall Total */}
          <div className="cart-total">
            <h2>Overall Total: ${overallTotal.toFixed(2)}</h2>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
