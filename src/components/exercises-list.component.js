import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 1 file has 2 components in it
// exercises list component (class component) and exercise component (functional component)
// easy to add functional component with no class needed
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    // method to delete exercises from list
    // button to delete exercises
    this.deleteExercise = this.deleteExercise.bind(this);
    // empty array of exercises
    this.state = { exercises: [] };
  }

  // get the list of exercises from database before the page loads
  // go to exercises end point, get the response from database and show the response data
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        this.setState({ exercises: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // method for deleting exercises - called in the constructor above
  // exact route on the backend
  // going to find id and send delete request
  // after deleted (.then) log that the exercise is deleted

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));
    // delete element user is going to see - update state with new information or removed information
    // filter the elements viewed the user.  For each element in the array we are going return all ids except the one deleted
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  // exercise list method
  // return the data from the table. - .map is going to return every element in the array
  // exercise component is going to be a row of the table
  // 3 props (variables) we are passing - current exercise, delete exercise method and current exercise id

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Jazzercise Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* the body is going to call the exercise list method.  Returning the table information */}
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}
