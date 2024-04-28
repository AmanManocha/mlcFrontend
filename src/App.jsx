import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateInvoice, Invoices, SignIn } from "./pages";
import "./App.css";
import AuthenticatedRoute from "./services/AuthenticatedRoutes";
import { Navigate } from "react-router-dom";
import API from "../axiosApi";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/invoices" element={<AuthenticatedRoute><Invoices /></AuthenticatedRoute>} />
          <Route path="/createInvoice" element={<AuthenticatedRoute><CreateInvoice /></AuthenticatedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
