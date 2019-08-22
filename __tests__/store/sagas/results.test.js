import { runSaga } from 'redux-saga';

import { Creators as ResultsCreators } from '../../../src/store/ducks/results';
import { getResults } from '../../../src/store/sagas/results';

describe('Testing results sagas', () => {
  it('should calculate results correctly', async () => {
    const dispatch = jest.fn();

    const getState = jest.fn(() => ({
      questions: {
        data: [
          {
            category: 'question_category1',
            difficulty: 'question_medium1',
            incorrectAnswers: ['2', '3', '4'],
            correctAnswer: '1',
            type: 'question_type1',
            question: 'question1',
          },
          {
            category: 'question_category2',
            difficulty: 'question_medium2',
            incorrectAnswers: ['False'],
            correctAnswer: 'True',
            type: 'question_type2',
            question: 'question2',
          },
        ],
      },
    }));

    const userAnswers = ['2', 'True'];

    const userResults = [
      {
        correctAnswer: '1',
        question: 'question1',
        userAnswer: '2',
        type: 'question_type1',
        isCorrect: false,
      },
      {
        correctAnswer: 'True',
        question: 'question2',
        userAnswer: 'True',
        type: 'question_type2',
        isCorrect: true,
      },
    ];

    const userScores = '1/2';

    await runSaga({ dispatch, getState }, getResults, {
      payload: userAnswers,
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      ResultsCreators.getResultsSuccess(userResults, userScores),
    );
  });
});
