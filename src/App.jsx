import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation ,Navigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Container, Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "./Components/comp";
import { data } from "./Products/Cards";
import CartPage from "./Components/cartpage";
import Carousel from "./Components/carousel";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [hasSignedUp, setHasSignedUp] = useState(localStorage.getItem("hasSignedUp") === "true");
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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
    setCart([]);
    navigate("/signin");
  };

  const handleSignUpSuccess = () => {
    setHasSignedUp(true);
    localStorage.setItem("hasSignedUp", "true");
    navigate("/productPage");
  };

  return (
    <Box>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          {isAuthenticated && location.pathname !== "/cart" && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
      <Routes>
  {/* Redirect to signup if not authenticated */}
  <Route path="/" element={!isAuthenticated && !hasSignedUp ? <SignUp onSignUpSuccess={handleSignUpSuccess} /> : <Navigate to="/productPage" />} />

  {/* SignIn Route */}
  <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />

  {/* Private Routes */}
  <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
    <Route path="/productPage" element={
      <>
        <Carousel />
        <Grid container spacing={2} justifyContent="center">
          {data.map((item) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
              <Card data={item} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </>
    } />
    
    <Route path="/cart" element={
      isAuthenticated ? (
        <CartPage
          cart={cart}
          updateQuantity={(id, quantity) => quantity > 0 ? updateQuantity(id, quantity) : removeItem(id)}
          removeItem={removeItem}
        />
      ) : (
        <Navigate to="/signin" />
      )
    } />
  </Route>

</Routes> 

      </Container>
    </Box>
  );
};

export default App;
