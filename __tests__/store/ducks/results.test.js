import reducer, {
  INITIAL_STATE,
  Types,
  Creators,
} from '../../../src/store/ducks/results';

describe('Testing Results reducers', () => {
  const userAnswers = ['True', 'False'];

  it('should return INITAL_STATE when no reducers matches with the passed type', () => {
    const state = reducer(INITIAL_STATE, { type: '@ANY_TYPE-DEFAULT-CASE' });

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('GET_RESULTS', () => {
    const state = reducer(INITIAL_STATE, {
      type: Types.GET_RESULTS,
      payload: userAnswers,
    });

    expect(state).toStrictEqual({ data: [], scores: '' });
  });

  it('GET_RESULTS_SUCCESS', () => {
    const data = [
      {
        question: 'Is G2i the best company in the world?',
        correctAnswer: 'True',
        userAnswer: 'True',
        isCorrect: true,
        type: 'boolean',
      },
    ];

    const scores = '1/1';

    const state = reducer(
      INITIAL_STATE,
      Creators.getResultsSuccess(data, scores),
    );

    expect(state).toStrictEqual({ data, scores });
  });
});
