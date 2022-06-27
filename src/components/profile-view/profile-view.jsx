import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap'

import './profile-view.scss';
import { connect } from 'react-redux';
import { setUser, setMovies } from '../../actions/actions'

class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: props.user.Username,
      Password: props.user.Password,
      Email: props.user.Email,
      Birthday: props.user.Birthday,
      FavoriteMovies: props.user.FavoriteMovies
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}`, 
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  )
  .then((response) => {
    console.log(response);
    this.props.setUser({
      Username: response.data.Username,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthday: response.data.Birthday,
      FavoriteMovies: response.data.FavoriteMovies
    });

    localStorage.setItem('user', this.props.user.Username);
    alert("Profile Updated")
    //window.open('/profile', '_self');
    });
  };

  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    console.log('removing from favorites...')
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}/movies/${movie._id}`,
      { 
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      console.log(response);
      alert("Movie removed");
      this.props.setUser({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Password,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixapi-by-sjd58.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      console.log(response);
      alert("Profile Deleted");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.props.setUser({user: null});
    })
    .catch(function (error) {
      console.log(error);
      alert("Delete unsuccessful")
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

  setEmail(value) {
    this.setState({
      Email: value
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  }

  render() {
    const { movies, user } = this.props;
    const { FavoriteMovies } = this.state;
    // if(!Username) {
    //   return null;
    // }
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Update your profile information below:</Card.Title>
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
                      placeholder="Enter your new username"
                      onChange={(e) => this.setUsername(e.target.value)}
                      value = {this.state.Username}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                      type="password"
                      name="Password"
                      placeholder="Enter your new password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      value = {this.state.Password}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                      type="email"
                      name="Email"
                      placeholder="Enter your new email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      value = {this.state.Email}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Form.Label>Birthday</Form.Label>
                      <FormControl
                        type="text"
                        name="Birthday"
                        placeholder="Enter your new birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                        value = {this.state.Birthday}
                        required
                      />
                  </FormGroup>
                </Form>
              </Card.Body>
              <Card.Footer id="card-footer">
                <Button variant="primary" type="submit" onClick={this.editUser}>Update Data</Button>
                <Button variant="primary" onClick={() => { this.onLoggedOut()}}>Logout</Button>
                <Button variant="danger" onClick={() => this.onDeleteUser()}>DeleteProfile</Button>
              </Card.Footer>
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
                        <Card className="favorite-movie" key={movie._id}>
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
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export const WrappedProfile = connect(mapStateToProps, { setMovies, setUser } ) (ProfileView);

ProfileView.propTypes = {
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