import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { questions: { createQuestion } } = useDispatch();

  return (
    <div className="question-form__container">
      <div className="input-group">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          value={question}
          onChange={event => {
            const { value } = event.target;
            setQuestion(value);
          }}
        />
      </div>
      <div className="input-group">
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={event => {
            const { value } = event.target;
            setAnswer(value);
          }}
        />
      </div>
      <div className="button__container">
        <button onClick={() => createQuestion({ question, answer })}>
          Create Question
        </button>
      </div>
    </div>
  );
}
