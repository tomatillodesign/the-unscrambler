import React, { Component } from 'react';

// import raw dictionary data
let dictionary = require('./Dictionary.json');

export default function ThuUpdatedSearch(props) {

     // set the user input to all lowercase letters
     let scramble = props.letters.toLowerCase();

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

     //////////////////////////////////////////////////////
     // NOW TEST ALL COMBOS AGAINST THE DICTIONARY
     //////////////////////////////////////////////////////

     let combos = newList.sort();
     let returnedList = {};

     console.log('All Possible Permutations (array):');
     console.log(combos);

     for (var x = 0; x < combos.length; x++) {

          let string = combos[x];
          let definition = dictionary[string];

          if( dictionary[string] ) {
               returnedList[string] = definition;
          }


     }


     //////////////////////////////////////////////////////
     // RETURN DISPLAY RESULTS
     //////////////////////////////////////////////////////

     let items = 'No words found yet...';
     let returnedListLength = Object.keys(returnedList).length;


     if( returnedListLength > 0 ) {

          items = Object.keys(returnedList).map(function(keyName, keyIndex) {
               console.log(keyName + ': ' + returnedList[keyName]);
            return ( <li className="word-hit" key={keyIndex} title={returnedList[keyName]}><span className="word-only">{keyName}</span></li> );
          });

     }



     return (
          <div>
               <div className="form-area"><h3>Your Results:</h3><ul>{items}</ul></div>
               <div className="combos">Tested {combos.length} possible combinations</div>
          </div> );


}
