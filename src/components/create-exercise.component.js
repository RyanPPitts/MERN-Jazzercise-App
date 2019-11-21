import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Component will allow us to add exercises to the database based on user inputs
// In javascript classes you always have to call super when defining the constructor of a subclass
export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    // need to bind the word "this" or "this.setstate"
    // we want this to refer to the class -CreateExercise
    // bind "this" to each method
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // create properities of the state that relate to the mongo database objects
    // state is how you create variables
    // the state is empty until the user fills out the information
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  // called right before anything is called on the page
  // run code before everything else

  // call axios get request to the localhost to find user information
  // after the request, we are going to take the response
  // and check if there is a response (greater than 0 - at least one user)
  // if so - return just user.username in the object array of potential users
  componentDidMount() {
    axios.get("http://localhost:5000/users/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
    // this.setState({
    //   users: ["test user"],
    //   username: "test user"
    // });
  }

  // method called when the user enters the username
  // enter username calls onChangeUsername function
  // value of text box is the new username or new state.  Just updates username element
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  // create calender for user to pick date
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  // handle the submit event within the submit button/form
  // when someone clicks submit the exercise variable will take in thew new state or inputs
  // information added above through the onChange methods
  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);
    // adding axios so we can take information and move to the database
    // linking to the exercise route with axios - when submitted information is funneled to the exercise db information
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data));

    // take people back to homepage after the submit button is selected
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create Jazzercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {/* Array of all users.  Map allows us to return something within an array */}
              {/* For each user in the array its going to return an select box of user */}
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              {/* DatePicker component pops up a calendar for the user */}
              {/* NPM install react-datepicker will install the datepicker component */}
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
