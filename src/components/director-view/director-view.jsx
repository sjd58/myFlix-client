import React from 'react';
import { Row, Col, Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './director-view.scss'

export class DirectorView extends React.Component {

  render() {
    const { director, movies, onBackClick } = this.props;

    return (
      <Row>
        <Col>
        <Card id="director-view">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <Card.Text>Birth: {director.Birth}</Card.Text>
            <Card.Text>Death: {director.Death}</Card.Text>
            <Button id="director-back-button" onClick={() => {onBackClick();}}>Back</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    )
  }
}