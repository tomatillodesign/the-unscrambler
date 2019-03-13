import React, { Component } from 'react';

import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function showProgress(props) {

     let isSearching = props.isSearching,
     percentProgress = props.percentProgress;

     if( isSearching === true ) {

          return (

               <div className="progress-bar-area">
                    <ProgressBar animated now={percentProgress} variant="success" />
               </div>

          );

     } else { return ( <div></div> ); }

}
