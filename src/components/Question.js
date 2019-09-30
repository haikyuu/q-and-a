import React from 'react'

export default function Question({ question }){
  return (
    <div className="question__container">
      <h4>{question.question}</h4>
      <span>{question.answer}</span>
    </div>
  )
}
