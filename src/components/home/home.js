import React from 'react';
import { withRouter } from "react-router-dom";

import './home.styles.css';

const Home = () => (
  <div className="imgContainer">
    <img alt="principal" src={require('./home.jpg')} />
  </div>
);

export default withRouter(Home);