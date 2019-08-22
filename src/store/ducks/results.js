export const Types = {
  GET_RESULTS: '@results/GET_RESULTS',
  GET_RESULTS_SUCCESS: '@results/GET_RESULTS_SUCCESS',
};

export const INITIAL_STATE = {
  scores: '',
  data: [],
};

export const Creators = {
  getResultsSuccess: (data, scores) => ({
    type: Types.GET_RESULTS_SUCCESS,
    payload: { data, scores },
  }),
};

const results = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_RESULTS:
      return {
        data: [],
        scores: '',
      };

    case Types.GET_RESULTS_SUCCESS: {
      return {
        data: payload.data,
        scores: payload.scores,
      };
    }

    default:
      return state;
  }
};

export default results;
