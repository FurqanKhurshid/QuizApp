import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { CircularProgress } from '@mui/material';
import Question from '../../Question/Questions';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Rating from '@mui/material/Rating';






const Quiz = ({ difficulty, name, score, setscore, category, questions, setQuestions }) => {
    const history = useNavigate();


    const [selected, setSelected] = useState()
    const [error, setError] = useState(false)
    const [attempted, setAttempted] = useState(0)
    const [options, setOptions] = useState()
    const [currQues, setCurrQues] = useState(0)
    var FilteredQues = questions.filter(i => i.difficulty == difficulty && i.category == category)
    var corrPer = Math.round((score / FilteredQues.length) * 100);

    var QuestPer = attempted == 0 ? 0 : Math.round((score / (attempted)) * 100)
    var maxScore = Math.round(((score + FilteredQues.length - (attempted)) / FilteredQues.length) * 100)
    var attemptPer = attempted == 0 ? 0 : Math.round((attempted / FilteredQues.length) * 100);
    const correct = FilteredQues[currQues]?.correct_answer





    useEffect(() => {


        FilteredQues.length && currQues < FilteredQues.length && setOptions(handleShuffle([
            FilteredQues[currQues]?.correct_answer,
            ...FilteredQues[currQues]?.incorrect_answers
        ]));

    }, [questions, currQues]);

    const handleShuffle = (optionss) => {
        return optionss.sort(() => Math.random() - 0.5)

    }

    const starsRating = () => {
        if (difficulty === 'easy') {
            return 1
        } else if (difficulty === 'medium') {
            return 2
        } else if (difficulty === 'hard') {
            return 3
        }
    }


    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return "select"
        } else if (selected === i && selected !== correct) {
            return "wrong"
        } else if (i === correct) {
            return "select"

        }


    }

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) {
            setscore(score + 1)
            setError(false)
        }
        setAttempted(attempted + 1)

    }

    const handleNext = () => {
        var FilteredQues = questions.filter(i => i.difficulty == difficulty && i.category == category)
        if (currQues + 1 >= FilteredQues.length) {
            history('/result')
        }
        else if (selected) {
            setCurrQues(currQues + 1)
            setSelected()
        }
        else {
            setError("Please select an option First")
        }
    }

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
        history('/')
        
    };

    return (

        <div>


            <div>
            <ProgressBar variant="dark" now={attemptPer} key={3} />

                <span>Difficulty Level</span><br />
                <Rating name="disabled" defaultValue={starsRating()} max={3} disabled />



            </div>
            <div className='quiz'>
                <span className='subtitle'>Welcome,{name}</span>



                {questions ? (

                    <>
                        <div className='quizInfo'>
                            <span>Category:{decodeURIComponent(category)}</span>
                        </div>

                        <Question
                            currQues={currQues}
                            setCurrQues={setCurrQues}
                            questions={questions}
                            options={options}
                            correct={correct}
                            score={score}
                            setscore={setscore}
                            setQuestions={setQuestions}
                            difficulty={difficulty}
                            category={category}
                            handleCheck={handleCheck}
                            handleNext={handleNext}
                            handleQuit={handleQuit}
                            handleSelect={handleSelect}
                            selected={selected}
                            error={error}


                        />




                    </>
                ) :
                    (<CircularProgress style={{ margin: 100 }}
                        color='inherit'
                        size={150}
                        thickness={1} />
                    )}










            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span>
                        Score:{corrPer}%
                    </span>
                    <span>
                        MaxScore:{maxScore}%

                    </span>


                </div>

                <ProgressBar variant="danger" now={maxScore}  key={3} />
                <ProgressBar style={{ marginTop: '-16px' }} variant="warning" now={QuestPer}  key={2} />
                <ProgressBar style={{ marginTop: '-16px' }}  variant="success" now={corrPer}  key={1} />




            </div>
        </div>



    )
}

export default Quiz