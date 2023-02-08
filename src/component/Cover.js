import React from 'react';

export default function Cover(props){
    return(
        <div className="cover-container">
            <h1>Quizzical</h1>
            <p>Quiz about general knowlege!</p>
            <button className="btn-start" onClick={props.start}>
                Start Quiz
            </button>
        </div>
    )
}