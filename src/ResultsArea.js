import React, { Component } from 'react';
import ShowProgress from './ShowProgress.js';
import FilterResults from './FilterResults.js';
import DefinitionModal from './DefinitionModal.js';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function ResultsArea(props) {

     let newList = props.newList;
     let numberCombos = props.combos;
     let isSearching = props.isSearching;
     let progress = props.progress;
     let percentProgress = (progress / numberCombos) * 100;

     console.log(newList);
     console.log("LENGTH: " + newList.length);
     console.log('isSearching: ' + isSearching);
     console.log('PROGRESS: ' + progress);
     console.log('numberCombos: ' + numberCombos);
     console.log('percentProgress: ' + percentProgress);

     let items = 'No words found yet...';
     let itemArray = Object.keys(newList);
     let returnedListLength = Object.keys(newList).length;

     if( returnedListLength > 0 ) {

          items = Object.keys(newList).map(function(keyName, keyIndex) {
               //console.log(keyName + ': ' + newList[keyName]);
            return ( <li className="word-hit"><DefinitionModal word={keyName} def={newList[keyName]} /></li> );
          });

          itemArray = Object.keys(newList);

     }

     return (
          <div>
               <div className="form-area">
                    <ShowProgress isSearching={isSearching} percentProgress={percentProgress} />
                    <FilterResults results={itemArray} />
                    <h3>Your Results</h3><ul>{items}</ul>
               </div>
               <div className="combos">Tested {numberCombos} possible combinations</div>
          </div> );

}
