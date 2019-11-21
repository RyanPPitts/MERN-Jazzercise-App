import React, { Component } from "react";
import { Link } from "react-router-dom";
// link allows us to link to other routes

export default class Navbar extends Component {
  // all components need to render information
  render() {
    return (
      // bootstrap navbar styling
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/* links instead of anchor tag */}
        <Link to="/" className="navbar-brand">
          Jazzercise Journal
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Exercises
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Exercise Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
