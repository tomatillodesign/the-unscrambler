import React, { Component } from 'react';

export default function ResultsDisplay(props) {

     let letters = props.letters;

    if( props.isSearching  === false ) {
        return <div className="not-searching">Not Searching - Letters: {letters}</div>;
    } else {
        return <div className="currently-searching">Currently Searching</div>;
    }
}
