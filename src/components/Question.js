import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import QuestionForm from "./QuestionForm";

export default function Question({ question }) {
  const { questions: { deleteQuestion } } = useDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const [shouldDisplayAnswer, setShouldDisplayAnswer] = useState(false);

  const onDeleteClick = () => deleteQuestion(question.id);
  const onEditClick = () => setIsEdited(!isEdited);

  return (
    <div className="box">
      {isEdited ? (
        <QuestionForm
          editedQuestion={question}
          isEdit
          onDeleteClick={onDeleteClick}
          onCancelClick={onEditClick}
        />
      ) : (
        <Fragment>
          <h4 className="title is-4 cursor-pointer" onClick={()=> setShouldDisplayAnswer(!shouldDisplayAnswer)}>{question.question} </h4>
          {shouldDisplayAnswer && (<span className="subtitle is-4">{question.answer}</span>)}
          <br />
          <button className="button is-danger is-small" onClick={onDeleteClick}>
            Delete
          </button>{" "}
          <button className="button is-primary is-small" onClick={onEditClick}>
            {isEdited ? "View" : "Edit"}
          </button>{" "}
        </Fragment>
      )}
    </div>
  );
}
