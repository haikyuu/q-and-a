import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header' 
import Question from './components/Question' 
import QuestionForm from './components/QuestionForm' 

function App() {
  const { ids, map } = useSelector(state=> state.questions)
  const { questions: { deleteQuestions } } = useDispatch()
  return (
    <div className="app">
      <Header title="Created Questions" purpose="Here, you can find created questions and their answers"/>
      {ids.map(id=>(
        <Question question={map[id]} key={id} />
      ))}        
      <Header title="Create a new question" purpose="Here, you can create new questions and their answers" />
      <QuestionForm />
      <button onClick={deleteQuestions}>Remove Questions</button>
    </div>
  );
}

export default App;
