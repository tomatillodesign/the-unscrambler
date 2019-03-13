import React, { Component } from 'react';
import ThuUpdatedSearch from './ThuUpdatedSearch.js';
import ResultsArea from './ResultsArea.js';

import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import raw dictionary data
let dictionary = require('./Dictionary.json');

class UpdatedLetterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
         letters: '',
         isSearching: false,
         progress: 0,
         combos: 0,
         searchResults: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.startSearch = this.startSearch.bind(this);

  }



  clearForm(event) {
       event.preventDefault();
       console.log('Clear Button');
       this.setState({letters: ''});
       this.setState({isSearching: false});
       this.setState({progress: 0});
       this.setState({combos: 0});
       this.setState({searchResults: [] });
 }



startSearch(letters) {

     this.setState({isSearching: true}, () => {
       //console.log('PERCENTAGE PROGRESS: ' + x / combos.length);
       this.forceUpdate();
     });

     // set the user input to all lowercase letters
     let scramble = letters.toLowerCase();
     console.log('Scramble: ' + scramble);

     // pull out the dictionary words and definitions for possible later use
     let dictionaryWordsArray = Object.keys(dictionary);
     let dictionaryEntriesArray = Object.entries(dictionary);

     //////////////// PREP WORK - GETTING ALL COMBOS //////////////////////////////////////

     // Use powerset to test all possible combinations of letters @param string 'scramble'
     let newList = [];
     let powerSetArray = powerSet(scramble);
     for (var i = 0; i < powerSetArray.length; i++) {
          let powerWord = powerSetArray[i].join('');
          let newCombos = generateAnagrams(powerWord);
          newList.push(newCombos);
     }

     /* PowerSet Engine */

     function powerSet(str) {

         var obj = {}
         //This loop is to take out all duplicate number/letter
         for(var i=0;i<str.length; i++){
            obj[str[i]] = true;
         }
         //variable array will have no duplicates
         var array = Object.keys(obj);
         var result = [[]];
         for(var j=0; j<array.length ;j++){
            //this line is crucial! It prevents us from infinite loop
            var len = result.length;
            for(var x=0; x<len ;x++){
              result.push(result[x].concat(array[j]))
            }
         }
     return result;
     }

     /* Improved Anagram Engine */

     // Without generators, it's difficult to write this function
     // with the capability of processing a word of any length without
     // crashing the web browser, so this is written as the original,
     // with non-controlled execution speed. Long (7+ char) words may
     // crash browser.

     function generateAnagrams(word) {

         if (word.length < 2) {

             return [word];

         } else {

             // By declaring all variables outside of the loop,
             // we improve efficiency, avoiding the needless
             // declarations each time.

             var anagrams = [];
             var before, focus, after;
             var shortWord, subAnagrams, newEntry;
             //var  = 0;

             for (var k = 0; k < word.length; k++) {

                 before = word.slice(0, k);
                 focus = word[k];
                 after = word.slice(k + 1, word.length + 1);
                 shortWord = before + after;
                 subAnagrams = generateAnagrams(shortWord);

                 for (var j = 0; j < subAnagrams.length; j++){

                     newEntry = focus + subAnagrams[j];
                     anagrams.push(newEntry);

                 }

             }

             return anagrams;

         }

     }

     // remove empty strings from array
     newList = newList.filter(v=>v!=='');

     // remove single letters from array
     newList = newList.filter(v=>v.length>1);

     // flatten array of arrays into single array
     newList = newList.flat();
     console.log('NEWLIST: ' + newList);



     //////////////////////////////////////////////////////
     // NOW TEST ALL COMBOS AGAINST THE DICTIONARY
     //////////////////////////////////////////////////////

     let combos = newList.sort();
     let returnedList = {};

     console.log('All Possible Permutations (array):');
     console.log(combos);

     for (var x = 0; x < combos.length; x++) {

          this.setState({progress: x }, () => {
            //console.log('PERCENTAGE PROGRESS: ' + x / combos.length);
            this.forceUpdate();
          });
          console.log('PERCENTAGE PROGRESS: ' + x / combos.length);

          let string = combos[x];
          let definition = dictionary[string];

          if( dictionary[string] ) {
               returnedList[string] = definition;
          }

     }


     //return newList;
     this.setState({combos: combos.length });
     this.setState({searchResults: returnedList });
     this.setState({isSearching: false});

}


handleSubmit(event) {
    console.log('A letter was submitted: ' + this.state.letters);
    this.setState({ letters: ''});
    event.preventDefault();
}


handleChange(event) {
     this.setState({letters: event.target.value}, () => {
          // console.log("New state in ASYNC callback:", this.state.letters);
          this.startSearch(this.state.letters);
     });
}



  render() {
    return (
         <div className="letter-form-area">
           <form id="letter-form" onSubmit={this.handleSubmit}>
             <label>
               Your Letters:
               <input type="text" value={this.state.letters} onChange={this.handleChange}  maxLength="10" placeholder="10 letters max" id="letter-area" />
             </label>
             <button type="submit" id="clear-button" onClick={this.clearForm}>Start Over</button>
           </form>

           <ResultsArea newList={this.state.searchResults} combos={this.state.combos} isSearching={this.state.isSearching} progress={this.state.progress+1}/>

      </div>
    );
  }
}

export default UpdatedLetterForm;
