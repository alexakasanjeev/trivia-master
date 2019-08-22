import reducer, {
  INITIAL_STATE,
  Types,
  Creators,
} from '../../../src/store/ducks/questions';

describe('Testing Question Reducers', () => {
  it('should return INITAL_STATE when no reducers matches with the passed type', () => {
    const state = reducer(INITIAL_STATE, { type: '@ANY_TYPE-DEFAULT-CASE' });

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('GET_QUESTIONS_REQUEST', () => {
    const state = reducer(INITIAL_STATE, { type: Types.GET_QUESTIONS_REQUEST });

    expect(state).toStrictEqual({ ...INITIAL_STATE, loading: true });
  });

  it('GET_QUESTIONS_SUCCESS', () => {
    const questions = [
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Unturned originally started as a Roblox game.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    ];

    const state = reducer(
      INITIAL_STATE,
      Creators.getQuestionsSuccess(questions),
    );

    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      loading: false,
      data: questions,
    });
  });

  it('GET_QUESTIONS_ERROR', () => {
    const state = reducer(INITIAL_STATE, Creators.getQuestionsFailure());

    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      loading: false,
      error: true,
    });
  });

  it('GET_QUESTIONS_NO_RESULT', () => {
    const state = reducer(INITIAL_STATE, Creators.getQuestionsNoResult());

    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      loading: false,
      noResult: true,
    });
  });

  it('RESET_STATE', () => {
    const state = reducer(INITIAL_STATE, { type: Types.RESET_STATE });

    expect(state).toStrictEqual(INITIAL_STATE);
  });
});
