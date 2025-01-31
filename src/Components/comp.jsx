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


import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductCard = ({ data, addToCart }) => {
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

  return (
    <Card
      sx={{
        width: "100%", 
        height: 350, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        p: 2,
        mb: 2, 
      }}
    >
      
      <CardMedia
        component="img"
        image={data.mobileImage || placeholderImage}
        alt={data.name}
        sx={{
          height: 150, 
          objectFit: "contain", 
          bgcolor: "#f5f5f5", 
        }}
      />
      
      
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 100, 
          overflow: "hidden", 
        }}
      >
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap", 
            minHeight: 40,
          }}
        >
          {data.name}
        </Typography>
        <Typography color="textSecondary">${data.price}</Typography>
        
        
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton onClick={handleDecrement} color="primary" disabled={quantity === 0}>
            <Remove />
          </IconButton>
          <Typography mx={2}>{quantity}</Typography>
          <IconButton onClick={handleIncrement} color="primary">
            <Add />
          </IconButton>
        </Box>
      </CardContent>

      
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        sx={{ margin: "2px", width: "100%" }}
        disabled={quantity === 0}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
