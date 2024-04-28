import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Button, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import API from "../../axiosApi";
import NavBar from "../component/AppBar";
import SearchBar from "../component/searchBar";
import Filter from "../component/filter";
import CreateButton from "../component/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";

const customerData = (
  customerID,
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
    customerID,
    customerName,
    customerContact,
    customerEmail,
    invoiceID,
    invoiceDate,
    paymentStatus,
    dueDate,
    amountDue,
    totalAmount,
  };
};

const token = localStorage.getItem("accessToken");

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onGenerateLink = async (invoiceId) => {
    setIsLoading(true);
    try {
      const response = await API.post(
        `generatePaymentLinks?invoiceNumber=${invoiceId}`,
        {},
        {
          headers: {
            accessToken: token,
          },
        }
      );
      console.log(response, "response");
    } catch (err) {
      console.log(err, "err");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          {row.customerID ? row.customerID : "-"}
        </TableCell>
        <TableCell align="right">
          {row.customerName ? row.customerName : "-"}
        </TableCell>
        <TableCell align="right">
          {row.customerContact ? row.customerContact : "-"}
        </TableCell>
        <TableCell align="right">
          {row.customerEmail ? row.customerEmail : "-"}
        </TableCell>
        <TableCell align="right">
          <Button
            aria-label="generate link"
            size="small"
            onClick={() => onGenerateLink(row.invoiceID)}
          >
            Generate Link
          </Button>
          {isLoading && <Loader show={isLoading} />}
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
                    <TableCell align="right">
                      {row.invoiceDate ? row.invoiceDate : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.paymentStatus ? row.paymentStatus : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.dueDate ? row.dueDate : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.amountDue ? row.amountDue : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.totalAmount ? row.totalAmount : "-"}
                    </TableCell>
                  </TableRow>
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
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Make API call to fetch data
        const response = await API.get("getAllInvoice", {
          headers: {
            accessToken: token,
          },
        });
        const formattedData = formatData(response.data);
        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const formatData = (data) => {
    return data.map((item) => {
      // Function to format date as DD/MM/YYYY
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      return customerData(
        item.customer.customerID,
        item.customer.name,
        item.customer.contactDetails,
        item.customer.email,
        item.invoiceID,
        formatDate(item.invoiceDate), 
        item.paymentStatus,
        formatDate(item.dueDate),
        item.totalAmount,
        item.amountDue
      );
    });
  };

  const handleInvoice = () => {
    navigate("/createInvoice");
  };

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      let response;
      if (searchQuery.trim() === "") {
        response = await API.get("getAllInvoice", {
          headers: {
            accessToken: token,
          },
        });
      } else {
        response = await API.get(`searchInvoice?searchTerm=${searchQuery}`, {
          headers: {
            accessToken: token,
          },
        });
      }
      const formattedData = formatData(response.data);
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (value) => {
    setFilterValue(value);
    setIsLoading(true);
    try {
      let response;
      if (value === "all") {
        response = await API.get("getAllInvoice", {
          headers: {
            accessToken: token,
          },
        });
      } else {
        response = await API.get(`filterInvoice?paymentStatus=${value}`, {
          headers: {
            accessToken: token,
          },
        });
      }
      const formattedData = formatData(response.data);
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "lightgrey",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          boxSizing: "border-box",
          margin: "30px 30px",
        }}
      >
        <div style={{ marginLeft: "90px" }}>
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div style={{ backgroundColor: "white", marginRight: "500px" }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div style={{ backgroundColor: "white", marginRight: "100px" }}>
          <CreateButton label={"Create Invoice"} onClick={handleInvoice} />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <TableContainer component={Paper} sx={{ width: "80vw" }}>
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
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {isLoading && <Loader show={isLoading} />}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
