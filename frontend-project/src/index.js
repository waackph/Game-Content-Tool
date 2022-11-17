import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ***
// The entry point into the React Application.
// This hooks the whole React DOM to the HTML div-Element with ID root.
// ***

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
