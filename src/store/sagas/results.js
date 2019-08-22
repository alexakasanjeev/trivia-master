import { select, put } from 'redux-saga/effects';
import { Creators as ResultsCreators } from '../ducks/results';

export function* getResults({ payload }) {
  try {
    const { data } = yield select((state) => state.questions);

    let scoresCount = 0;

    const results = data.map((question, index) => {
      const isCorrect = question.correctAnswer === payload[index];

      if (isCorrect) {
        scoresCount += 1;
      }

      return {
        correctAnswer: question.correctAnswer,
        question: question.question,
        userAnswer: payload[index],
        type: question.type,
        isCorrect,
      };
    });

    const scores = `${scoresCount}/${results.length}`;

    yield put(ResultsCreators.getResultsSuccess(results, scores));
  } catch (err) {
    console.log(err);
  }
}
