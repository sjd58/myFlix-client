import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navbar-view.scss';
import '../main-view/main-view.jsx';

export function NavbarView({user}) {

  return(
    <Container id="navbar-container">
        <Navbar id="navbar" fixed="top">
            <Navbar.Brand id="navbar-brand" href="/">MyFlix</Navbar.Brand>
            <Nav id="nav" className ="me-auto">
                <Nav.Link id="nav-link" href ="/profile">My Profile</Nav.Link>
            </Nav>
        </Navbar>
    </Container>
  )
}