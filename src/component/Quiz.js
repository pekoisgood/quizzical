import React from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';



export default function Quiz(props){
    


    const quizes = props.quizData.map(item => {
        
        return(
            <div className='quiz-container'>
                <h2 className='quiz-question'>{item.question}</h2>
                <div className='quiz-ans-container'>
                    {item.answers.map(ans => 
                    <button 
                        onClick={()=>props.handleClickAnswer(item.id, ans)} 
                        className={`${ props.showScore ?  
                        ans === item.correct_answer ? "quiz-ans correct_ans" :
                            ans === item.selected && ans !== item.correct_answer ? "quiz-ans incorrect_ans" : "quiz-ans other_incorrect_ans"
                        : 
                        item.selected === ans ? "quiz-ans selected" : "quiz-ans" }`} 
                        // className={item.selected === ans ? "quiz-ans selected" : "quiz-ans"} 
                    >
                        {ans}
                    </button>)}
                </div>
                <hr />
            </div>
        )
    })
    console.log(props.allCheck)

    return(
        <div className='quizes-container'>
            {quizes}
            
            {props.showScore ? 
            <div className='quiz-score-container'>
                <h3>You scored {props.score}/10 correct answer</h3>
                <button className="btn" onClick={props.playAgain}>Play again</button>
            </div> : 
            <div className='quiz-check-answer-container'>
                <button className='btn' onClick={props.checkScore}>Check Answer</button>
                {/* check if every question is answered */}
                {props.allCheck === false && <p>*** Please answer every question ***</p>}
            </div>
            }
        </div>
    )
}
