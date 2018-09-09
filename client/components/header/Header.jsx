import React from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <Navbar expand="md">
      <Nav className="ml-auto" navbar>
        <NavLink tag={Link} to="/">Home</NavLink>
        <NavLink tag={Link} to="/user">Add User</NavLink>
      </Nav>
      <NavbarToggler />
      <Collapse isOpen={false} navbar />
    </Navbar>
  </header>
);

export default Header;
