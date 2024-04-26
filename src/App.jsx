import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import {CreateInvoice, Invoices, SignIn} from './pages';
import './App.css';
// import AuthenticatedRoute from './components/services/AuthenticatedRoute';
// import UnauthenticatedRoute from './components/services/UnauthenticatedRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element= {<SignIn />}/>
          <Route path='/invoices' element = {<Invoices/>} />
          <Route path='/createInvoice' element = {<CreateInvoice/>} />
          {/* <Route path='/signup' element = {<SignUp/>} />
          <Route path='/dashboard' element = {<AuthenticatedRoute><Dashboard/></AuthenticatedRoute>} />
          <Route path='/manageJobs' element = {<AuthenticatedRoute><ManageJobs/></AuthenticatedRoute>}/>
          <Route path='/manageJobForm' element = {<AuthenticatedRoute><ManageJobForm/></AuthenticatedRoute>}/>
          <Route path='/manageJobForm/:jobId' element = {<AuthenticatedRoute><ManageJobForm/></AuthenticatedRoute>}/>
					<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
