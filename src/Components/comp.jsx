// import React, { useState } from "react";

// const Card = ({ data, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const placeholderImage = "https://via.placeholder.com/150"; // Default image

//   const handleIncrement = () => setQuantity(quantity + 1);
//   const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

//   const handleAddToCart = () => {
//     if (quantity > 0) {
//       addToCart({ ...data, quantity });
//       setQuantity(0); // Reset quantity after adding to cart
//     }
//   };

//   return (
//     <>

//     <div className="card">
//       <div className="card-image">
//         <img src={data.mobileImage || placeholderImage} alt={data.name} />
//       </div>
//       <div className="card-content">
//         <h2 className="card-title">{data.name}</h2>
//         <p className="card-category">${data.price}</p>

//         {/* Quantity Controls */}
//         <div className="quantity-controls">
//           <button onClick={handleDecrement} className="quantity-btn">
//             -
//           </button>
//           <span className="quantity-value">{quantity}</span>
//           <button onClick={handleIncrement} className="quantity-btn">
//             +
//           </button>
//         </div>
//         <button onClick={handleAddToCart} className="add-to-cart-btn">
//           Add
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };


// export default Card;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductCard = ({ data, addToCart }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const placeholderImage = "https://via.placeholder.com/150";

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...data, quantity });
      setQuantity(0);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
      }}
    >
      <CardMedia
        component="img"
        image={data.mobileImage || placeholderImage}
        alt={data.name}
        sx={{
          height: 120,
          objectFit: "contain",
          bgcolor: "#f5f5f5",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          px: 0.5,
          pb: 1,
          pt: 0.5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "13px",
          }}
        >
          {data.name}
        </Typography>
        <Typography color="textSecondary" fontSize="12px">
          ${data.price}
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={1}
          gap={1}
        >
          <IconButton onClick={handleDecrement} color="primary" size="small" disabled={quantity === 0}>
            <Remove fontSize="small" />
          </IconButton>
          <Typography fontSize="13px">{quantity}</Typography>
          <IconButton onClick={handleIncrement} color="primary" size="small">
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        sx={{
          fontSize: "12px",
          py: 0.5,
        }}
        disabled={quantity === 0}
      >
        Add
      </Button>
    </Card>
  );
};

export default ProductCard;
