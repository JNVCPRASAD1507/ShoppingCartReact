// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Card from "./Components/comp";
// import { data } from "./Products/Cards";
// import CartPage from "./Components/cartpage";
// import Carousel from "./Components/carousel";
// // import { Margin } from "@mui/icons-material";

// const App = () => {
//   const [cart, setCart] = useState([]); // State to manage items in the cart
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart"));
//     if (savedCart) {
//       setCart(savedCart);
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Function to update the quantity of an item
//   const updateQuantity = (id, newQuantity) => {
//     setCart(
//       cart.map((item) =>
//         item._id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Function to remove an item from the cart
//   const removeItem = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   // Add item to the cart
//   const addToCart = (item) => {
//     const existingItem = cart.find((cartItem) => cartItem._id === item._id);

//     if (existingItem) {
//       // Increment quantity if item already exists
//       setCart(
//         cart.map((cartItem) =>
//           cartItem._id === item._id
//             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
//             : cartItem
//         )
//       );
//     } else {
//       // Add new item with the quantity passed
//       setCart([...cart, item]);
//     }
//   };


//   return (
//     <div className="mobileView">
//       <div className="main-bg">
//         {/* Conditionally render the marquee only on the store page */}
//         {location.pathname === "/" && (
//           <div className="marquee-container">
//             <h1 className="marquee">🛒✨ Welcome to my cart – Grab the Best Deals on Groceries, Fresh Vegetables, Dry Fruits, and More! 🚀🎉 Shop Now & Save Big! 🛍️💰  </h1>
//           </div>
//         )}

//         {/* <div >  <Carousel /> </div> */}
//         {location.pathname !== "/cart" && <Carousel />}

//         {/* Conditionally render the cart icon */}
//         {location.pathname !== "/cart" && (
//           <div className="cart-container">
//             <button className="cart-button" onClick={() => navigate("/cart")}>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
//                 alt="Cart"
//                 className="cart-icon"
//               />
//               {/* Display number of items in the cart */}
//               <span className="cart-count">{cart.length}</span>
//             </button>
//           </div>
//         )}

//         <Routes>
//           {/* Store Page */}
//           <Route
//             path="/"
//             element={
//               <>


//                 {/* <h1>STORE</h1> */}
//                 <div className="app">
//                   {data.map((item) => (
//                     <Card key={item._id} data={item} addToCart={addToCart} />
//                   ))}
//                 </div>
//               </>
//             }
//           />
//           {/* Cart Page */}
//           <Route
//             path="/cart"
//             element={
//               <CartPage
//                 cart={cart}
//                 updateQuantity={(id, quantity) => {
//                   if (quantity > 0) {
//                     updateQuantity(id, quantity);
//                   } else {
//                     removeItem(id); // Remove the item if quantity is 0
//                   }
//                 }}
//                 removeItem={removeItem}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Container, Typography, Box, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "./Components/comp";
import { data } from "./Products/Cards";
import CartPage from "./Components/cartpage";
import Carousel from "./Components/carousel";

const App = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <Box>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          {location.pathname !== "/cart" && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {location.pathname === "/" && (
        <Box sx={{ textAlign: "center", p: 2, backgroundColor: "#f5f5f5" }}>

          <marquee behavior="" direction="rtl">
            <Typography variant="h5" color="primary" fontWeight="bold">
            🛒✨ Welcome to my cart – Grab the Best Deals on Groceries, Fresh Vegetables, Dry Fruits, and Moreee.....
            </Typography>

          </marquee>
        </Box>
      )}

      {location.pathname !== "/cart" && <Carousel />}

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Grid container spacing={2} justifyContent="center">
                {data.map((item) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
                    <Card data={item} addToCart={addToCart} />
                  </Grid>
                ))}
              </Grid>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={(id, quantity) => {
                  if (quantity > 0) {
                    updateQuantity(id, quantity);
                  } else {
                    removeItem(id);
                  }
                }}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
