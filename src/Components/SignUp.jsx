import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    gender: Yup.string().required("Gender is required"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5000/users", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User added successfully:", data);
        // alert("Signup successful!");

      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", values.username);

      
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        alert("Error signing up. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Error saving data: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{ username: "", password: "", gender: "", mobile: "" }}
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

              <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
                <RadioGroup name="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>

              <Field
                as={TextField}
                name="mobile"
                label="Mobile Number"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/signin")}>Sign In</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
