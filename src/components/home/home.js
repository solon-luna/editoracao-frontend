import React, { Component } from "react";
import './home.styles.css';

class Home extends Component {
  render() {
    return (
      <home className="main-footer">
        <div className="imgContainer">
          <img alt="principal" src={require('./home.jpg')} />
        </div>
      </home>
    );
  }
}

export default Home;
