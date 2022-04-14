import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Nav } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

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
    setPassword('Password must be longer than 6 characters')
    isReq = false;
  }
  return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://myflixapi-by-sjd58.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <Container id="login-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="login-card">
              <Card.Body>
                <Card.Title id="login-card-title">Please login to MyFlix</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                      {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                      {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
                <Card.Text>Not registered yet?</Card.Text>
                <Nav id="nav" className ="me-auto">
                  <Nav.Link id="nav-link" href ="/register">Click here to register</Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};