import questions from "../models/questions";
import { init } from "@rematch/core";

describe("questions model", () => {
  const initStore = () => init({ models: { questions } });
  const store = initStore();
  it("should contain one question by default", () => {
    const questions = store.getState().questions;
    expect(questions.ids).toHaveLength(1);
  });
  it("should create a new question successfuly", () => {
    const newQuestion = { question: "How old are you?", answer: "28" };
    store.dispatch.questions.createQuestion(newQuestion);
    const questions = store.getState().questions;
    expect(questions.ids).toHaveLength(2);
    expect(questions.map[questions.ids[1]]).toMatchObject(newQuestion);
    expect(questions.map[questions.ids[1]].id).not.toBeUndefined();
  });
  it("should create a new question with delay successfuly", async () => {
    const store = initStore();
    const newQuestion = { question: "How sick are you?", answer: "a lot" };
    await store.dispatch.questions.createDelayedQuestion({
      // we want tests to be fast
      delay: 0,
      question: newQuestion
    });
    const questions = store.getState().questions;
    expect(questions.ids).toHaveLength(2);
    expect(questions.map[questions.ids[1]]).toMatchObject(newQuestion);
    expect(questions.map[questions.ids[1]].id).not.toBeUndefined();
  });

  it("should delete all questions successfuly", () => {
    store.dispatch.questions.deleteQuestions();
    const questions = store.getState().questions;
    expect(questions.ids).toHaveLength(0);
    expect(questions.map).toEqual({});
  });

  it("should delete one question successfuly", () => {
    const store = initStore();
    store.dispatch.questions.deleteQuestion(0);
    const questions = store.getState().questions;
    expect(questions.ids).toHaveLength(0);
    expect(questions.map).toEqual({});
  });
  it("should edit one question successfuly", () => {
    const store = initStore();
    const newQuestion = { id: 0, question: "why?", answer: "like that" };
    store.dispatch.questions.editQuestion(newQuestion);

    const questions = store.getState().questions;
    expect(questions.map[questions.ids[0]]).toMatchObject(newQuestion);
  });
});
