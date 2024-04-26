import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Select, MenuItem, Button, Box, FormControl, Alert, FormHelperText, Snackbar } from '@mui/material';
import API from '../../axiosApi';
import validate from 'validate.js';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../component/AppBar';
import CreateButton from '../component/Button';


// const ManageJobsSchema = {
//   jobTitle: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 300,
//     },
//   },
//   jobDescription: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 300,
//     },
//   },
//   email: {
//     presence: { allowEmpty: false, message: 'is required' },
//     email: true,
//     length: {
//       maximum: 300,
//     },
//   },
//   phoneNumber: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       minimum: 10,
//       maximum: 10,
//     },
//   },
//   categories: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   jobType: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   designation: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   salary: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   qualification: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   jobSkills: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   applicationDeadlineDate: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   country: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   city: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
//   zipCode: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       minimum: 6,
//     },
//   },

// };


const CreateInvoice = () => {
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [formData, setFormData] = useState(
        {
            isValid: false,
            values: {},
            errors: {},
        }
    );
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
        const errors = validate(formData.values);//schema for error
        setFormData(formData => ({
            ...formData,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
        if (errors) return false;


        try {
            const payload = {
                customer: {
                    customerID: formData.values.customerID,
                    name: formData.values.customerName,
                    contactDetails: formData.values.customerContact,
                    email: formData.values.customerEmail
                },
                invoiceDate: formData.values.invoiceDate,
                dueDate: formData.values.dueDate,
                amountDue:formData.values.amountDue,
                totalAmount:formData.values.totalAmount
            }
            const response = await API.request({
                method:'POST',
                url: '/createInvoice',
                data: payload,
                headers: {
                    accessToken: token
                }
            });

            console.log(response, 'response')
            if (response.status === 200) {
                setShowSnackbar(true);
                // Sign up successful
                navigate('/invoices');
            } else {
                setError({ ...error, server: response.data.message });
                console.error('Unable to create Invoice', response.data.message);//create file for messages
                setShowSnackbar(true);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            // const message = error.response.message || 'Sign up failed. Please try again later.';
            // setError({ ...error, server: message });
            // setShowSnackbar(true);
        }
    };
    //   const handleSnackbarClose = () => {
    //     setShowSnackbar(false);
    //     navigate('/manageJobs'); 
    //   };
    //   useEffect(() => {
    //     if (navigate && navigate === '/manageJobs') {
    //       window.location.reload();
    //     }
    //   }, [navigate]);
    return (
        <>
            <NavBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Create Invoice</Typography>
                </Grid>
                {/* <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Invoice ID"
              variant="outlined"
              name="invoiceID"
              required
            />
          </FormControl>
        </Grid> */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Customer ID"
                            variant="outlined"
                            name="customerID"
                            required
                            error={Boolean(formData?.errors?.customerID)}
                            value={formData.values.customerID ? formData.values.customerID : ""}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Customer Name"
                            variant="outlined"
                            name="customerName"
                            required
                            error={Boolean(formData?.errors?.customerName)}
                            value={formData.values.customerName ? formData.values.customerName : ""}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Customer Contact"
                            variant="outlined"
                            name="customerContact"
                            required
                            error={Boolean(formData?.errors?.customerName)}
                            value={formData.values.customerContact ? formData.values.customerContact : ""}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Customer Email"
                            variant="outlined"
                            name="customerEmail"
                            required
                            error={Boolean(formData?.errors?.customerEmail)}
                            value={formData.values.customerEmail ? formData.values.customerEmail : ""}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Invoice Date"
                            variant="outlined"
                            name="invoiceDate"
                            type="date"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={Boolean(formData?.errors?.invoiceDate)}
                            value={formData.values.invoiceDate ? formData.values.invoiceDate : ""}
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
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={Boolean(formData?.errors?.dueDate)}
                            value={formData.values.dueDate ? formData.values.dueDate : ""}
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
                            required
                            error={Boolean(formData?.errors?.amountDue)}
                            value={formData.values.amountDue ? formData.values.amountDue : ""}
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
                            required
                              error={Boolean(formData?.errors?.totalAmount)}
                            value={formData.values.totalAmount ? formData.values.totalAmount : ""}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <CreateButton label={"Create Invoice"} onClick={handleCreateInvoice}/>
                </Grid>
            </Grid>
            {/* <Snackbar
        open={showSnackbar}
        autoHideDuration={2000} // Adjust duration as needed
        onClose={handleSnackbarClose}
        message={error.server ? error.server : (jobDetails ? 'Job Details Updated Successfully!' : 'Job Posted Successfully!')}
      /> */}
        </>
    );
}

export default CreateInvoice;
