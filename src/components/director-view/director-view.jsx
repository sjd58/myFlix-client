import React from 'react';
import { Container } from 'react-bootstrap';
import { Container, Row, Col, Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './director-view.scss'

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card id="director-view">
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>{director.Bio}</Card.Text>
              <Card.Text>{director.Birth}</Card.Text>
              <Card.Text>{director.Death}</Card.Text>
              <Button id="director-back-button" onClick={() => {onBackClick();}}></Button>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}