import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import { Creators as QuestionsCreators } from '../../../src/store/ducks/questions';
import { getQuestions } from '../../../src/store/sagas/questions';
import CONSTANTS from '../../../src/utils/constants';
import api from '../../../src/services/api';

const apiMock = new MockAdapter(api);

describe('Testing questions sagas', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    apiMock.resetHandlers();
    jest.clearAllMocks();
  });

  it('should fetch data from api with default parameters', async () => {
    const mockedResult = Array(CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS).fill({
      incorrect_answers: ['False'],
      incorrectAnswers: ['False'],
      difficulty: 'difficulty1',
      correct_answer: 'True',
      correctAnswer: 'True',
      question: 'question',
      category: 'category',
      type: 'boolean',
      options: null,
    });

    apiMock
      .onGet('/', {
        params: {
          amount: CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS,
          type: CONSTANTS.VALUES.DEFAULT_TYPE_QUESTIONS,
        },
      })
      .reply(200, {
        results: mockedResult,
        response_code: 0,
      });

    await runSaga({ dispatch }, getQuestions, { payload: undefined }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      QuestionsCreators.getQuestionsSuccess(mockedResult),
    );
  });

  it('should fetch data from api with just amount set', async () => {
    const mockedResult = Array(CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS).fill({
      incorrect_answers: ['False'],
      incorrectAnswers: ['False'],
      difficulty: 'medium',
      correct_answer: 'True',
      correctAnswer: 'True',
      question: 'question',
      category: 'category',
      type: 'boolean',
      options: null,
    });

    const params = {
      amount: CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS + 1,
    };

    apiMock
      .onGet('/', {
        params,
      })
      .reply(200, {
        results: mockedResult,
        response_code: 0,
      });

    await runSaga({ dispatch }, getQuestions, {
      payload: { [CONSTANTS.PARAMS.QUESTIONS_PARAMS]: params },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      QuestionsCreators.getQuestionsSuccess(mockedResult),
    );
  });

  it('should fetch data from api with all parameters set', async () => {
    const mockedResult = Array(CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS).fill({
      incorrect_answers: ['False'],
      incorrectAnswers: ['False'],
      difficulty: 'medium',
      correct_answer: 'True',
      correctAnswer: 'True',
      question: 'question',
      category: 'category',
      type: 'boolean',
      options: null,
    });

    const params = {
      amount: CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS,
      type: CONSTANTS.VALUES.DEFAULT_TYPE_QUESTIONS,
      difficulty: 'medium',
      category: 10,
    };

    apiMock
      .onGet('/', {
        params,
      })
      .reply(200, {
        results: mockedResult,
        response_code: 0,
      });

    await runSaga({ dispatch }, getQuestions, {
      payload: { [CONSTANTS.PARAMS.QUESTIONS_PARAMS]: params },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      QuestionsCreators.getQuestionsSuccess(mockedResult),
    );
  });

  it("should have no result when api doesn't have enough items to be returned", async () => {
    const mockedResult = Array(CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS).fill({
      response_code: 1,
      results: [],
    });

    const params = {
      type: CONSTANTS.VALUES.QUESTION_BOOLEAN,
      category: 13,
      amount: 50,
    };

    apiMock
      .onGet('/', {
        params,
      })
      .reply(200, {
        results: mockedResult,
        response_code: 1,
      });

    await runSaga({ dispatch }, getQuestions, {
      payload: { [CONSTANTS.PARAMS.QUESTIONS_PARAMS]: params },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      QuestionsCreators.getQuestionsNoResult(),
    );
  });

  it('should have an error when have problem when try to request data from the api', async () => {
    const params = {
      type: CONSTANTS.VALUES.QUESTION_BOOLEAN,
      category: 13,
      amount: 50,
    };

    apiMock
      .onGet('/', {
        params,
      })
      .reply(404);

    await runSaga({ dispatch }, getQuestions, {
      payload: { [CONSTANTS.PARAMS.QUESTIONS_PARAMS]: params },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      QuestionsCreators.getQuestionsFailure(),
    );
  });
});
