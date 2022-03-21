import React from 'react';
import axios from 'axios';
import {Col, Row, Container } from "react-bootstrap";
import "./main-view.scss"

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor() {
    super();
// Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflixapi-by-sjd58.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

// When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

// When a user successfully logs in, this function updates the 'user' property in state to that *particular user

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />

    return (
      <Container>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie}
              onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
              />
            </Col>
          )
          : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}