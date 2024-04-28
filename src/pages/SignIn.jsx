import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";
import validate from "validate.js";

import microLendingCompany from "../assets/micro-lending-company.jpg";
import "../css/SignIn.css";
import API from "../../axiosApi";

const loginSchema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    errors: {},
  });

  const handleFieldChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    }));
  };

  const handleSignIn = async () => {
    const errors = validate(formState.values, loginSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
    if (errors) return false;

    try {
      const response = await API.post("signIn", formState.values);
      if (response.status === 200) {
        console.log("response", response);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/invoices");
      } else {
        console.error("Sign in failed with status:", response.status);
        setError("Sign in failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      const message =
        error.response.data.message ||
        "Sign in failed. Please try again later.";
      setError(message);
    }
  };

  return (
    <div className="background-image">
      <Container maxWidth="sm">
        <Card className="container">
          <CardContent className="cardContentSignIn">
            <Typography variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            <form className="form">
              <TextField
                name="username"
                label="Username"
                fullWidth
                required
                value={formState.values.username || ""}
                onChange={handleFieldChange}
                variant="outlined"
                autoComplete="username"
                helperText={
                  formState.errors.username?.length
                    ? formState.errors.username[0]
                    : null
                }
                error={Boolean(formState.errors.username)}
                margin="normal"
                className="username"
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                required
                value={formState.values.password || ""}
                onChange={handleFieldChange}
                variant="outlined"
                autoComplete="current-password"
                type="password"
                helperText={
                  formState.errors.password?.length
                    ? formState.errors.password[0]
                    : null
                }
                error={Boolean(formState.errors.password)}
                margin="normal"
                className="password"
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                className="signIn"
                variant="contained"
                color="primary"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn;
