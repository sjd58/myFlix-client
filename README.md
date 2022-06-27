## myFlix Client

Project Description:
This project contains the code to render the front end of an application to allow users to create, read, update, and delete lists of their favortie movies and learn more about them!
The myFlix Client works with a node.js API to receive and work with user and movie data from a database. 
Using this application is very straightforward: users easily create accounts by entering their username, email, passoword, and birthdate, then they are free to check out any movies they would like and create lists of their favorites!

## Technologies used:

-axios
-react
-react-bootstrap
-react-redux

## User Stories

-As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in.
-As a user, i want to be able to create a profile so that I can save data about my favorite movies.

## Features and Requirements

Main View
-Returns a list of ALL movies to the user (each listed item with an image, title, and description)
-Sorting and filtering
-Ability to select a movie for more details

Single Movie View
-Returns data (cescription, genre, director, image) about a single movie to the user
-Allows users to add a movie to their list of favorites

Login View
-Allows users to log in with a username and password
-Registration view
-Allows new users to register (username, password, email, birthday)

Genre View
-Returns data about a genre, with a name and description
-Displays example movies

Director View
-Returns data about a director (name, bio, birth year, death year)
-Displays example movies

Profile View
-Allows users to update their user info (username, passowrd, email, date of birth)
-Allows existing users to deregister
-Displays favorite movies
-Allows users to remove a movie from their list of favorites