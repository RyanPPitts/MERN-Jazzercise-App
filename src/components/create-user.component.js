import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    // Only adjusting the state of the username with this component
    // user will submit username and that will change the state
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // username will start blank or ''
    this.state = {
      username: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    console.log(user);

    // axios will take front end information and move to the database
    // .then is a promise. - this is the user route in the backend folder
    //  take result or res and console log the information and add to DB
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));

    this.setState({
      username: ""
    });
  }

  render() {
    return (
      <div>
        <h3>Create User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
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
