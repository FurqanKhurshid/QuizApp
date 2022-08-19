import React, { useState } from 'react'
import ErrorMessage from '../ErrorMessage/Error'
import './Question.css'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import Progress from '../Progress-bar/ProgressBar';


const Question = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setscore,
    score,
    setQuestions,
    difficulty,
    category,
    handleSelect,
    handleQuit,
    handleNext,
    handleCheck,
    selected,
    error
}) => {
    

    return (
        <div className='question'>
            <h1>Question {currQues + 1}</h1>
            <div className='singleQuestion'>
                {/* temp1.filter(i=>i.difficulty === 'easy') */}
                <h2>{decodeURIComponent(questions.filter(i => i.difficulty == difficulty && i.category == category)[currQues]?.question)}</h2>
                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {
                        options &&
                        options.map(i => (
                            <button
                                className={`singleOption ${selected && handleSelect(i)}`}

                                key={i}
                                onClick={() => handleCheck(i)}

                                disabled={selected}

                            >{decodeURIComponent(i)}</button>
                        ))
                    }

                </div>

                <div className='controls'>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        style={{ width: 185 }}
                        
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        style={{ width: 185 }}
                        onClick={handleNext}


                    >
                        Next Question
                    </Button>


                </div>


            </div>
           



        </div>

    )
}

export default Question;