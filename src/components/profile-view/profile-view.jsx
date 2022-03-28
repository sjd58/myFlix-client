import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap'

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://myflixapi-by-sjd58.herokuapp.com/users/${username}`, {
      headers: { Authorization:`Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage .getItem('token');

    axios.put(`https://myflixapi-by-sjd58.herokuapp.com/users${Username}`, 
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    {
      header: { Authorization: `Bearer ${token}`}
    }
  )
  .then((response) => {
    this.setState({
      Username: response.data.Username,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthday: response.data.Birthday
    });

    localStorage.setItem('user', this.state.Uername);
    alert("Profile Updated")
    window.open('/profile,', '_self');
    });
  }

  onRemoveFavorite = (e, movies) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixapi-by-sjd58.herokuapp.com/users${Username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      console.log(response);
      alert("Movie removed");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixapi-by-sjd58.herokuapp.com/users${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      console.log(response);
      alert("Profile Deleted");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setUsername(value) {
    this.setState({
      Username: value
    });
  }

  setPassword(value) {
    this.setState({
      Password: value
    });
  }
  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  }

  render() {
    const { movies, onbackClick } = this.props;
    const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;

    if(!Username) {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>

                <Form 
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >

                  <FormGroup>
                    <Form.Label>Username</Form.Label>
                    <FormControl
                      type="text"
                      name="Username"
                      placeholder="Enter your username"
                      value={Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={Password}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={Email}
                      onChange={(e) => this.setBirthday(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div>
                    <Button variant="primary" type="submit" onClick={this.editUser}>Update Data</Button>
                    <Button variant="danger" onClick={() => this.onDeleteUser()}>DeleteProfile</Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
          <Card>
            <Card.Body>
              {FavoriteMovies.length === 0 && (
                <div className="center-text">No favorite movies</div>
              )}
              <Row className="favorite-movies-container">
                {FavoriteMovies.length > 0 && movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie" key={movie._id} >
                        <Card.Img
                          className="favorite-movie-image"
                          variant="top"
                          src={movie.ImagePath}
                        />
                        <Card.Body>
                          <Card.Title className="movie-title">
                            {movie.Title}
                          </Card.Title>
                          <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove from list</Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
              </Row>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onbackClick: PropTypes.func.isRequired
}