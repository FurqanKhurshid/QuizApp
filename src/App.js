import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Home'
import Quiz from './Components/Pages/Quiz/Quiz';
import Result from './Components/Pages/Result/Result';
import { useState } from 'react';
import Questions from './questions.json'



function App() {


  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [category, setCategory] = useState('')

  const [questions, setQuestions] = useState(Questions);
  const [score, setscore] = useState(0)


  return (
    <Router>


      <div className="app" style={{ backgroundImage: "url(./question1.png)" }}>

        <Header />


        <Routes>
          <Route path='/' exact element={<Home
            name={name}
            setName={setName}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
            questions={questions}
            setQuestions={setQuestions}
            score={score}
            setscore={setscore}
          />} />
          <Route path='/quiz' exact element={<Quiz
            name={name}
            score={score}
            setscore={setscore}
            difficulty={difficulty}
            category={category}
            questions={questions}
            setQuestions={setQuestions}
          />}
          />
          <Route path='/result' exact element={<Result
            score={score}
            name={name}
            questions={questions}
            difficulty={difficulty}
            category={category}

          />} />






        </Routes>
      </div >

    </Router>


  );
}

export default App;
