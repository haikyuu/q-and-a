import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import QuestionForm from './QuestionForm'

export default function Question({ question }) {
  const { questions: { deleteQuestion } } = useDispatch();
  const [isEdited, setIsEdited] = useState(false);

  const onDeleteClick = () => deleteQuestion(question.id);
  const onEditClick = () => setIsEdited(!isEdited);

  return (
    <div className="question__container">
      {isEdited ? (
        <QuestionForm
          editedQuestion={question}
          isEdit
          onDeleteClick={onDeleteClick}
          onCancelClick={onEditClick}
        />
      ) : (
        <Fragment>
          <h4>
            {question.question} <button onClick={onDeleteClick}>Delete</button>{" "}
            <button onClick={onEditClick}>{isEdited ? "View" : "Edit"}</button>{" "}
          </h4>
          <span>{question.answer}</span>
        </Fragment>
      )}
    </div>
  );
}
