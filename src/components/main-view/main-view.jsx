import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';
import {Col, Row } from "react-bootstrap";
import "./main-view.scss";

import { setMovies, setUser } from '../../actions/actions';
import { connect } from 'react-redux';
import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
  constructor() {
    super();
// Initial state is set to null
    this.state = {
      user: null
    };
  }

getMovies(token) {
  axios.get('https://myflixapi-by-sjd58.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    //Assign the result to the state
    this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

// When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

// When a user successfully logs in, this function updates the 'user' property in state to that *particular user

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

//function to log out users by deleting the token and user from localStorage
onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

  render() {
    let { movies } = this.props;
    let { user } = this.props;
    console.log(user)
    
    return (
      <Router>
        <Row>
          <NavbarView user={user} />
        </Row>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <MoviesList movies={movies}/>;
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/login" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <LoginView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={(user =>this.onLoggedIn(user))} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length ===0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView 
              director={movies.find(m => m.Director.Name === match.params.name).Director}
              onBackClick={() => history.goBack()}
              movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
            </Col>
          }
          } />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView 
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
                onBackClick={() => history.goBack()} 
                movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
            </Col>
          }
          } />
          <Route exact path="/profile" render={({ history }) => {
            if (!user) 
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              return <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);