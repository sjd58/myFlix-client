import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row, Nav } from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

// Validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
    setUsernameErr('Username Required');
    isReq = false;
  } else if(username.length < 2){
    setUsernameErr('Username must be longer than 2 characters');
    isReq = false;
  }
  if(!password){
    setPasswordErr('Password Required');
    isReq = false;
  } else if(password.length < 6){
    setPassword('Password must be longer than 6 characters');
    isReq = false;
  }
  if(!email){
    setEmailErr('Email Required');
    isReq = false;
  } else if(email.indexOf('@') === -1) {
    setEmailErr('Please enter a valid email address');
  }
  if(!birthday){
    setBirthdayErr('Birthday Required');
    isReq = false;
  }
  return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://myflixapi-by-sjd58.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login');
        window.open('/', '_self');
      })
      .catch(response => {
        console.log(response);
        alert('unable to register');
      });
    }
  };

  return (
    <Container id="registration-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="registration-card">
              <Card.Body>
                <Card.Title id="registration-card-title">Please Register Below: </Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label id="registration-form-label">Username: </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Enter a Password"
                      minLength="8"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                      placeholder="Enter your birthday"
                      />
                      {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Group>

                  <Button variant="primary"
                    type="submit"
                    onClick={handleSubmit}>
                      Register
                  </Button>
                <Card.Text>Already Registered?</Card.Text>
                <Nav id="nav" className ="me-auto">
                  <Nav.Link id="nav-link" href ="/login">Click here to login</Nav.Link>
                </Nav>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func.isRequired
};