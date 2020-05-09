import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './Loader.styles.css';

export const Loader = () => (
  <div className="loader">
    <CircularProgress size={60} thickness={7} color="#0c7563"/>
  </div>
);
