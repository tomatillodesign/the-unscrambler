import React, { Component } from 'react';
import './App.css';
import LetterForm from './LetterForm.js';

//let dictionary = require('./Dictionary.json');
//console.log(Object.keys(dictionary));
//let letters = '';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to The Unscrambler</h1>
          <div className="clb-credit">Created by Chris Liu-Beers &middot; Tomatillo Design</div>
        </header>
        <LetterForm />
        <footer className="clb-footer">Dictionary Source: 1913 Edition of Webster's Unabridged English Dictionary</footer>
      </div>
    );
  }
}

export default App;
