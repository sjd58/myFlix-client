import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import "./movie-view.scss";

class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      Username: props.user.Username,
      Password: props.user.Password,
      Email: props.user.Email,
      Birthday: props.user.Birthday,
      FavoriteMovies: props.user.FavoriteMovies
    }
    this.addFavorite = this.addFavorite.bind(this);
  };

  addFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}/movies/${movie._id}`,
    {},
      {
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    .then((response) => {
      this.props.setUser({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
      alert("Favorite has been added!");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

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
                <Card.Text>Click below to learn more:</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
              </Card.Body>
              <Card.Footer id="card-footer">
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

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export const WrappedMovieView = connect(mapStateToProps, { setMovies, setUser }) (MovieView)

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
    ).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array
  }),
  movies: PropTypes.array.isRequired
};