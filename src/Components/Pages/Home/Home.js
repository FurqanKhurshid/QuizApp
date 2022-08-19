import { Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import ErrorMessage from '../../ErrorMessage/Error'
import { useNavigate } from 'react-router-dom';
import Questions from '../../../questions.json'


import './Home.css'


const Home = ({ name, setName, difficulty, setDifficulty, category, setCategory,questions }) => {
    
    const [error, setError] = useState(false)

    const history = useNavigate();

    const handleSubmit = () => {
        var FilteredQues = questions.filter(i => i.difficulty == difficulty && i.category == category)

        if (!name || !difficulty || !category ) {
            setError('Fields Error')
            return;
        }
        else {
            if (FilteredQues.length == 0) {
                setError('No Question')
            }
            else {
                setError(false)
                history("/quiz")
            }
        }
    }

    var increment = (function (n) {
        return function () {
            n++;
            return n;
        }
    }(0));

    return (
        <div className='content'>
            <div className='settings'>
                <span style={{ fontSize: 30 }}>Quiz Settings</span>

                <div className='settings__select'>
                    {error == 'Fields Error' && <ErrorMessage>Please fill all the fields</ErrorMessage>}
                    {error == 'No Question' && <ErrorMessage>No Questions Found</ErrorMessage>}

                    <TextField
                        style={{ marginBottom: 25 }}
                        label='Enter Your Name'
                        variant='outlined'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        select
                        label='Select Category'
                        value={category}
                        onChange={(e) => decodeURIComponent(setCategory(e.target.value))}
                        variant='outlined'
                        style={{ marginBottom: 30 }}
                    >
                        {Questions.map((cat, i) =>
                            <MenuItem key={increment(i)} value={cat.category}>
                                {decodeURIComponent(cat.category)}
                            </MenuItem>

                        )}



                    </TextField>


                    <TextField
                        select
                        label='Select Difficulty'
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        variant='outlined'
                        style={{ marginBottom: 30 }}
                    >
                        <MenuItem key='Easy' value='easy'>
                            Easy
                        </MenuItem>
                        <MenuItem key='Medium' value='medium'>
                            Medium
                        </MenuItem>
                        <MenuItem key='Hard' value='hard'>
                            Hard
                        </MenuItem>

                    </TextField>

                </div>
                <Button variant='contained' color='primary' size='large'
                onClick={handleSubmit} >
                    Start Quiz
                </Button>
            </div>

            <img src="/quiz.svg" className='banner' alt='quiz Image' />
        </div>
    )
}

export default Home