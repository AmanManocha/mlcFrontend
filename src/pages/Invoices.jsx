import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import {Button} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import API from '../../axiosApi';
import NavBar from "../component/AppBar";
import SearchBar from "../component/searchBar";
import Filter from "../component/filter";
import CreateButton from "../component/Button";
import { useNavigate } from 'react-router-dom';

const customerData = (
    customerId,
    customerName,
    customerContact,
    customerEmail,
    invoiceID,
    invoiceDate,
    paymentStatus,
    dueDate,
    amountDue,
    totalAmount
) => {
    return {
        customerId,
        customerName,
        customerContact,
        customerEmail,
        invoiceID,
        invoiceDate,
        paymentStatus,
        dueDate,
        amountDue,
        totalAmount
    };
}
const token = localStorage.getItem('accessToken');
const onGenerateLink = async (invoiceId) => {
    console.log(invoiceId,'...........')
    const token = localStorage.getItem('accessToken');
    try {
        const response = await API.post(`generatePaymentLinks?invoiceNumber=${invoiceId}`,{}, {
            headers: {
                accessToken: token,
               
            }
        });
        console.log(response,'response')
    }
    catch(err) {
        console.log(err,'err')
    }
  

}
function Row({ row }) {
    console.log("row", row)
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.customerId}
                </TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.customerContact}</TableCell>
                <TableCell align="right">{row.customerEmail}</TableCell>
                <TableCell align="right">
                    <Button
                        aria-label="generate link"
                        size="small"
                        onClick={() => onGenerateLink(row.invoiceID)}
                    >
                        Generate Link
                    </Button>
                </TableCell>
       
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Invoice
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Invoice ID</TableCell>
                                        <TableCell>Invoice Date</TableCell>
                                        <TableCell align="right">Payment Status</TableCell>
                                        <TableCell align="right">Due Date</TableCell>
                                        <TableCell align="right">Amount Due</TableCell>
                                        <TableCell align="right">Total Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.invoiceID}
                                        </TableCell>
                                        <TableCell align="right">{row.invoiceDate}</TableCell>
                                        <TableCell align="right">{row.paymentStatus}</TableCell>
                                        <TableCell align="right">{row.dueDate}</TableCell>
                                        <TableCell align="right">{row.amountDue}</TableCell>
                                        <TableCell align="right">{row.totalAmount}</TableCell>
                                    </TableRow>

                                    {/* {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        customerID: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        contactDetails: PropTypes.number.isRequired,

        email: PropTypes.string.isRequired,

        invoiceID: PropTypes.number.isRequired,
        invoiceDate: PropTypes.string.isRequired,
        paymentStatus: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        amountDue: PropTypes.number.isRequired,
        totalAmount: PropTypes.number.isRequired,

    }).isRequired,
};

const Invoices = () => {
    const [rows, setRows] = useState([]);
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make API call to fetch data
                const response = await API.get('getAllInvoice', {
                    headers: {
                        accessToken: token
                    }
                });
                console.log(response, 'response')
                const dataRows = response.data && response.data.map(item =>
                    customerData(
                        item.customer.customerID,
                        item.customer.name,
                        item.customer.contactDetails,
                        item.customer.email,
                        item.invoiceID,
                        item.invoiceDate,
                        item.paymentStatus,
                        item.dueDate,
                        item.totalAmount,
                        item.amountDue,


                    ));
                setRows(dataRows);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const handleInvoice = () => {
        navigate('/createInvoice'); // Navigate to create invoice page
    };

    return (
        <>
        <NavBar />
        <SearchBar/>
        <Filter/>
        <CreateButton label={'Create Invoice'} onClick={handleInvoice}/>
        <TableContainer component={Paper} sx={{width:"80vw"}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Customer ID</TableCell>
                        <TableCell align="right">Customer Name</TableCell>
                        <TableCell align="right">Contact</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};
export default Invoices;
