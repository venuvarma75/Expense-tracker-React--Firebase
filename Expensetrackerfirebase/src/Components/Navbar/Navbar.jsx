import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//  import {signOut,getAuth} from "firebase/auth"
import "./Navbar.css"

const Navbarr = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">💸 Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/dashboard" id="navbar-link-button">DashBoard</Link>
            <Link to="/add-expense" id="navbar-link-button">AddExpense</Link>
            <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
            <Link to="/Register" className="navbar-link-button">Register</Link>
            <Link to="/login" className="navbar-link-button">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
