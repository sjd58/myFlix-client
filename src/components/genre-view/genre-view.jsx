import React from 'react';
import { Container, Row, Col, Card, Button, CardGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, movies, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card id="director-view">
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Button id="genre-back-button" onClick={() => {onBackClick();}}>Back</Button>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}