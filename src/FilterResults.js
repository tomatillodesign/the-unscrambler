import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ResultsArea from './ResultsArea.js';

export default function FilterResults(props) {

     let items = props.results;
     console.log(items);

     let allLetters = items.join('');
     let allLetterArray = allLetters.split('');
     console.log(allLetterArray);
     let uniqueLettersOnly = [...new Set(allLetterArray)];
     console.log(uniqueLettersOnly);

     let filterHeadline = '';
     if( uniqueLettersOnly.length > 0 ) {
          filterHeadline = <div><h4>Filter Your Results</h4><div className="select-letter-headline">Require the following letters:</div></div>;
     }
     console.log(uniqueLettersOnly.length);

          let uniqueLetterCheckboxes = Object.keys(uniqueLettersOnly).map(function(keyName, keyIndex) {
            return (
                 <Form.Check inline label={uniqueLettersOnly[keyName]} type="checkbox" id={`inline-checkbox-${keyName}`} />
             );
          });

          // Need to create new class component with state for Checkbox form

     return (

          <div className="filter-results-area">
               { // <UniqueLetterFilter uniqueLetters={uniqueLettersOnly} />
               }
               {filterHeadline}
               <Form>
               <div key="inline-checkbox" className="mb-3">
                    {uniqueLetterCheckboxes}
               </div>
               </Form>
          </div>

     );

}
