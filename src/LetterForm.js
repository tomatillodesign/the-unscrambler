import React, { Component } from 'react';
import ThuUpdatedSearch from './ThuUpdatedSearch.js';

class LetterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
         value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  clearForm(event) {
       console.log('Clear Button');
       this.setState({value: ''});
 }

  render() {
    return (
         <div className="letter-form-area">
           <form onSubmit={this.handleSubmit} id="letter-form">
             <label>
               Your Letters:
               <input type="text" value={this.state.value} onChange={this.handleChange}  maxLength="9" placeholder="9 letters max" id="letter-area" />
             </label>
             <button type="button" id="clear-button" onClick={this.clearForm}>Start Over</button>
           </form>
           <ThuUpdatedSearch letters={this.state.value} />
      </div>
    );
  }
}

export default LetterForm;
