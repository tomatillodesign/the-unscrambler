import React, { Component } from 'react';
import './App.css';
import LetterForm from './LetterForm.js';
import UpdatedLetterForm from './UpdatedLetterForm.js';

//import ProgressBar from './react-bootstrap/ProgressBar';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//let dictionary = require('./Dictionary.json');
//console.log(Object.keys(dictionary));
//let letters = '';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Unscrambler</h1>
          <div className="clb-credit">Created by Chris Liu-Beers &middot; Tomatillo Design</div>
        </header>

        <UpdatedLetterForm />

        <footer className="clb-footer">Source: 1913 Edition of Webster's Unabridged English Dictionary</footer>
      </div>
    );
  }
}

export default App;
