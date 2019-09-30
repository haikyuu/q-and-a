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
      <div className="field">
        <label className="label" htmlFor="question">
          Question
        </label>
        <div className="control">
          <input
            type="text"
            id="question"
            className="input"
            value={question}
            onChange={event => {
              const { value } = event.target;
              setQuestion(value);
            }}
          />
        </div>{" "}
      </div>
      <div className="field">
        <label className="label" htmlFor="answer">
          Answer
        </label>
        <div className="control">
          <input
            type="text"
            id="answer"
            className="input"
            value={answer}
            onChange={event => {
              const { value } = event.target;
              setAnswer(value);
            }}
          />
        </div>{" "}
      </div>
      <div className="button__container">
        {isEdit ? (
          <Fragment>
            <button className="button" onClick={onCancelClick}>
              Cancel
            </button>

            <button
              className="button is-primary"
              onClick={() => {
                editQuestion({ id: editedQuestion.id, question, answer });
                onCancelClick();
              }}
            >
              Edit Question
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <div className="field">
              <div className="control">
                <label className="checkbox" htmlFor="delayed">
                  <input
                    type="checkbox"
                    id="delayed"
                    value={delayed}
                    onChange={event => {
                      const { checked } = event.target;
                      setDelayed(checked);
                    }}
                  />
                  Delay with 5 seconds
                </label>
              </div>
            </div>
            <button
              className="button is-primary"
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
