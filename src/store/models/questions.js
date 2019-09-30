// we don't need to have a globally unique id
// because the state won't be saved anywhere
let idCounter = 0;

export default {
  state: {
    ids: [],
    map: {}
  },
  reducers: {
    createQuestion(state, question) {
      idCounter++;
      const id = idCounter;
      return {
        ...state,
        ids: [...state.ids, id],
        map: {
          ...state.map,
          [id]: question
        }
      };
    },
    editQuestion(state, question) {
      return {
        ...state,
        map: {
          ...state.map,
          [question.id]: question
        }
      };
    },
    deleteQuestion(state, id) {
      // we should not mutate state
      let map = { ...state.map };
      delete map[id];
      return {
        ...state,
        ids: state.ids.filter(storeId => storeId !== id),
        map
      };
    },
    deleteQuestions(state){
      return {
        ...state,
        ids: [],
        map: {}
      }
    }
  },
  effects: dispatch => ({
    async createDelayedQuestion({ delay, question }) {
      await new Promise(resolve => setTimeout(resolve, delay));
      dispatch.questions.createQuestion(question);
    }
  })
};
