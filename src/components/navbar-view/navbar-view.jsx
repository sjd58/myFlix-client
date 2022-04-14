import React from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './navbar-view.scss';
import '../main-view/main-view.jsx';

export function NavbarView({user}) {

  return(
    <Container id="navbar-container">
        <Navbar id="navbar" fixed="top">
            <Navbar.Brand id="navbar-brand" as={Link} to="/">
              MyFlix
            </Navbar.Brand>
            <Nav id="nav" className ="me-auto">
                <Nav.Link id="nav-link" as={Link} to="/profile">
                  My Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    </Container>
  );
}