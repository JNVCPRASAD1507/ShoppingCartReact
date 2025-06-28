

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("https://shoppingcart-backend-5lrv.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        setLoading(false);
      });
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const user = users.find(
      (u) => u.username === values.username && u.password === values.password
    );
  
    if (user) {
      // Store user data in localStorage after successful login
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", values.username);
  
      // alert("Login successful! Redirecting...");
      navigate("/productPage"); 
    } else {
      alert("Invalid username or password.");
    }
  
    setSubmitting(false);
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
         <Typography align="center" sx={{ mt: 2 }}>
                  Don't have an account?{" "}
                  <Button onClick={() => navigate("/")}>Sign Up</Button>
                </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
