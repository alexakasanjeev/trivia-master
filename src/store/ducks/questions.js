export const Types = {
  GET_QUESTIONS_NO_RESULT: '@questions/GET_QUESTIONS_NO_RESULT',
  GET_QUESTIONS_REQUEST: '@questions/GET_QUESTIONS_REQUEST',
  GET_QUESTIONS_SUCCESS: '@questions/GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_ERROR: '@questions/GET_QUESTIONS_ERROR',
  RESET_STATE: '@questions/RESET_STATE',
};

export const INITIAL_STATE = {
  noResult: false,
  loading: false,
  error: false,
  data: [],
};

export const Creators = {
  getQuestionsSuccess: (questions) => ({
    type: Types.GET_QUESTIONS_SUCCESS,
    payload: { questions },
  }),

  getQuestionsFailure: () => ({
    type: Types.GET_QUESTIONS_ERROR,
  }),

  getQuestionsNoResult: () => ({
    type: Types.GET_QUESTIONS_NO_RESULT,
  }),
};

const questions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_QUESTIONS_REQUEST:
      return {
        ...INITIAL_STATE,
        loading: true,
      };

    case Types.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.questions,
      };

    case Types.GET_QUESTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case Types.GET_QUESTIONS_NO_RESULT:
      return {
        ...state,
        loading: false,
        noResult: true,
      };

    case Types.RESET_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default questions;
