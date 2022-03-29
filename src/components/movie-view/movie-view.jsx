import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      FavoriteMovies: [],
      userDetails: []
    }

    this.getUserDetails = this.getUserDetails.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }
  
  getUserDetails() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.get(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}`, 
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  )
  .then((response) => {
    console.log(response.data);
      this.props.setUser(response.user);

      this.setState({
        userDetails: response.data,
        FavoriteMovies: response.data.FavoriteMovies
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  addFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    .then((response) => {
      console.log(response);
      alert("Favorite has been added!");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="movie-view">
              <Card.Body>
                <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                <Card.Text id="movie-description" className="movie-description">{movie.Description}</Card.Text>
                <Card.Text id="movie-director" className="movie-director">Director: {movie.Director.Name}</Card.Text>
                <Card.Text id="movie-genre" className="movie-genre">Genre: {movie.Genre.Name}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
              </Card.Body>
              <Card.Footer>
                <Button id="movie-view-button" onClick={() => { onBackClick(); }}>Back</Button>
                <Button id="movie-view-button" onClick={(e) => { this.addFavorite(e, movie)}}>Add to favorites</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};