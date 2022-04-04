import React from 'react';
import { Row, Col, Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, movies, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <Card id="director-view">
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
            </Card.Body>
            <Card.Footer id="card-footer">
              <Button id="genre-back-button" onClick={() => {onBackClick();}}>Back</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    )
  }
}