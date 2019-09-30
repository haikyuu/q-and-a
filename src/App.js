import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Question from "./components/Question";
import QuestionForm from "./components/QuestionForm";

function App() {
  const { ids, map } = useSelector(state => state.questions);
  const { questions: { deleteQuestions } } = useDispatch();
  const [isSorted, setIsSorted] = useState(false);
  const sortedIds = [...ids].sort((id1, id2) =>
    map[id1].question.localeCompare(map[id2].question)
  );

  const questionIds = isSorted ? sortedIds : ids;
  return (
    <div className="container">
      <section className="section">
        <Header
          title="Created Questions"
          purpose="Here, you can find created questions and their answers"
        />
        {questionIds.length === 0 && (
<article class="message is-info">
  <div class="message-body">
    No questions yet :-(
  </div>
          </article>
        )}
        {questionIds.map(id => <Question question={map[id]} key={id} />)}

        <button className="button is-danger" onClick={deleteQuestions}>
          Remove Questions
        </button>
        <button className="button is-info" onClick={() => setIsSorted(true)}>
          Sort Questions
        </button>
      </section>
      <section className="section">
        <Header
          title="Create a new question"
          purpose="Here, you can create new questions and their answers"
        />
        <QuestionForm />
      </section>{" "}
    </div>
  );
}

export default App;
