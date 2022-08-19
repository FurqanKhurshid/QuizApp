import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Result.css'
import Button from '@mui/material/Button'



const Result = ({name,score,questions,difficulty,category}) => {
  const history = useNavigate()
   useEffect(() => {
    if(!name){
        history('/')

    }
   
   }, [name,history]) 

   const onClick = () =>{
    history('/')
   }
   var FilteredQues = questions.filter(i => i.difficulty == difficulty && i.category == category)
   var totalPer = Math.round((score / FilteredQues.length) * 100);

  return (
    <div className='result'>
        <span className='title'>Your Final Score : {totalPer}%</span>
        <Button
        variant='contained'
        color='secondary'
        size='large'
        style={{ alignSelf: 'center', marginTop: 20}}
        onClick={onClick}
        
        >Go TO HomePage</Button>
        </div>
  )
}

export default Result