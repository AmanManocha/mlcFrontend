import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Snackbar,
} from "@mui/material";
import API from "../../axiosApi";
import validate from "validate.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/AppBar";

import Loader from "../component/Loader";
import Alert from "@mui/material/Alert";

const CreateInvoice = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    isValid: false,
    values: {},
    errors: {},
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const errors = validate(formData.values, {
      customerID: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 999999, // Maximum 6 digits
        },
      },
      customerName: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        format: {
          pattern: /^[a-zA-Z\s]+$/, // Alphabets and spaces only
          message: "can only contain alphabets",
        },
      },
      customerContact: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        length: {
          minimum: 10,
          maximum: 10,
        },
      },
      customerEmail: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        email: true,
      },
      invoiceDate: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
      },
      dueDate: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
      },
      amountDue: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        numericality: {
          onlyInteger: false, 
          greaterThanOrEqualTo: 0, 
        },
      },
      totalAmount: {
        presence: {
          allowEmpty: false,
          message: "is required",
        },
        numericality: {
          onlyInteger: false,
          greaterThanOrEqualTo: 0, 
        },
      },
    });
    setFormData((formData) => ({
      ...formData,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
    if (errors) return false;
    try {
      setIsLoading(true);
      const payload = {
        customer: {
          customerID: formData.values.customerID,
          name: formData.values.customerName,
          contactDetails: formData.values.customerContact,
          email: formData.values.customerEmail,
        },
        invoiceDate: formData.values.invoiceDate,
        dueDate: formData.values.dueDate,
        amountDue: formData.values.amountDue,
        totalAmount: formData.values.totalAmount,
      };
      const response = await API.request({
        method: "POST",
        url: "/createInvoice",
        data: payload,
        headers: {
          accessToken: token,
        },
      });

      setShowSnackbar(true);
      navigate("/invoices");
    } catch (error) {
      console.error("Error during create invoice:", error);
      setError("error");
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    navigate("/invoices");
  };
  useEffect(() => {
    if (navigate && navigate === "/invoices") {
      window.location.reload();
    }
  }, [navigate]);
  return (
    <>
      <NavBar />
      <Box
        sx={{
          bgcolor: "lightgrey",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="md" style={{ flex: "1", paddingTop: "30px" }}>
          <Typography
            variant="h5"
            color="textPrimary"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Create Invoice
          </Typography>
          <Box sx={{ bgcolor: "white", p: 3, borderRadius: 8 }}>
            <form onSubmit={handleCreateInvoice}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // required
                    label="Customer ID"
                    name="customerID"
                    variant="outlined"
                    value={formData.values.customerID || ""}
                    error={Boolean(formData.errors.customerID)}
                    helperText={
                      formData.errors.customerID?.length
                        ? formData.errors.customerID[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // required
                    label="Customer Name"
                    name="customerName"
                    variant="outlined"
                    value={formData.values.customerName || ""}
                    error={Boolean(formData.errors.customerName)}
                    helperText={
                      formData.errors.customerName?.length
                        ? formData.errors.customerName[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // required
                    label="Customer Contact"
                    name="customerContact"
                    variant="outlined"
                    value={formData.values.customerContact || ""}
                    error={Boolean(formData.errors.customerContact)}
                    helperText={
                      formData.errors.customerContact?.length
                        ? formData.errors.customerContact[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // required
                    label="Customer Email"
                    name="customerEmail"
                    variant="outlined"
                    value={formData.values.customerEmail || ""}
                    error={Boolean(formData.errors.customerEmail)}
                    helperText={
                      formData.errors.customerEmail?.length
                        ? formData.errors.customerEmail[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Invoice Date"
                      variant="outlined"
                      name="invoiceDate"
                      type="date"
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(formData.errors.invoiceDate)}
                      helperText={
                        formData.errors.invoiceDate?.length
                          ? formData.errors.invoiceDate[0]
                          : null
                      }
                      value={formData.values.invoiceDate || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Due Date"
                      variant="outlined"
                      name="dueDate"
                      type="date"
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(formData.errors.dueDate)}
                      helperText={
                        formData.errors.dueDate?.length
                          ? formData.errors.dueDate[0]
                          : null
                      }
                      value={formData.values.dueDate || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Amount Due"
                      variant="outlined"
                      name="amountDue"
                      // required
                      error={Boolean(formData.errors.amountDue)}
                      helperText={
                        formData.errors.amountDue?.length
                          ? formData.errors.amountDue[0]
                          : null
                      }
                      value={formData.values.amountDue || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Total Amount"
                      variant="outlined"
                      name="totalAmount"
                      // required
                      error={Boolean(formData.errors.totalAmount)}
                      helperText={
                        formData.errors.totalAmount?.length
                          ? formData.errors.totalAmount[0]
                          : null
                      }
                      value={formData.values.totalAmount || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  {error && <Alert severity="error">{error}</Alert>}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Invoice"}
                  </Button>
                  {isLoading && <Loader />}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Invoice created successfully!"
      />
    </>
  );
};

export default CreateInvoice;
