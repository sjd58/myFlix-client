import React from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView({user}) {

  return(
    <Container id="navbar-container">
        <Navbar id="navbar" fixed="top">
            <Navbar.Brand id="navbar-brand" href="/">MyFlix</Navbar.Brand>
            <Nav id="nav" className ="me-auto">
                <Nav.Link id="nav-link" href ="/profile">Profile</Nav.Link>
            </Nav>
        </Navbar>
    </Container>
  )
}