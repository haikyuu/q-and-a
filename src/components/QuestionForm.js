import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

export default function QuestionForm({
  isEdit,
  editedQuestion,
  onDeleteClick,
  onCancelClick
}) {
  const [question, setQuestion] = useState(
    isEdit ? editedQuestion.question : ""
  );
  const [answer, setAnswer] = useState(isEdit ? editedQuestion.answer : "");
  const [delayed, setDelayed] = useState(false);

  const {
    questions: { createQuestion, createDelayedQuestion, editQuestion }
  } = useDispatch();
  const clearInputs = () => {
    setQuestion("");
    setAnswer("");
  };
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
        {isEdit ? (
          <Fragment>
            <button onClick={onCancelClick}>Cancel</button>

            <button
              onClick={() =>
                {
                editQuestion({ id: editedQuestion.id, question, answer })
                onCancelClick()
                }}
            >
              Edit Question
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <input
              type="checkbox"
              name="delayed"
              value={delayed}
              onChange={event => {
                const { checked } = event.target;
                setDelayed(checked);
              }}
            />
            <label htmlFor="delayed">Delay with 5 seconds</label>

            <button
              onClick={async () => {
                const newQuestion = { question, answer };
                clearInputs();
                if (delayed) {
                  await createDelayedQuestion({ question: newQuestion });
                } else {
                  createQuestion(newQuestion);
                }
              }}
            >
              Create Question
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}
