import { all, takeLatest } from 'redux-saga/effects';

import { Types as QuestionsCreators } from '../ducks/questions';
import { Types as ResultsCreators } from '../ducks/results';

import { getQuestions } from './questions';
import { getResults } from './results';

export default function* rootSaga() {
  return yield all([
    takeLatest(QuestionsCreators.GET_QUESTIONS_REQUEST, getQuestions),
    takeLatest(ResultsCreators.GET_RESULTS, getResults),
  ]);
}
