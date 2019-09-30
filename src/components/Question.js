import React from 'react'
import { useDispatch } from 'react-redux'

export default function Question({ question }){
  const { questions: {deleteQuestion} } = useDispatch()
  return (
    <div className="question__container">
      <h4>{question.question} <button onClick={()=>deleteQuestion(question.id)}>Delete</button></h4>
      <span>{question.answer}</span>
    </div>
  )
}
