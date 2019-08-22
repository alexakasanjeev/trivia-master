import { call, put } from 'redux-saga/effects';

import { Creators as QuestionsCreators } from '../ducks/questions';
import shuffleArray from '../../utils/shuffleArray';
import parseParams from '../../utils/parseParams';

import CONSTANTS from '../../utils/constants';
import api from '../../services/api';

export function* getQuestions({ payload }) {
  try {
    const hasParamsField = payload && payload[CONSTANTS.PARAMS.QUESTIONS_PARAMS];

    const params = hasParamsField
      ? payload[CONSTANTS.PARAMS.QUESTIONS_PARAMS]
      : {
        amount: CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS,
        type: CONSTANTS.VALUES.DEFAULT_TYPE_QUESTIONS,
      };

    const requestParams = Object.keys(params).reduce((accumulator, key) => {
      if (params[key]) {
        return { ...accumulator, [key]: params[key] };
      }

      return accumulator;
    }, {});

    const { data } = yield call(api.get, '/', {
      paramsSerializer: (paramToSerialize) => parseParams(paramToSerialize),
      params: requestParams,
    });

    if (data.response_code === CONSTANTS.VALUES.API_NO_RESULT) {
      yield put(QuestionsCreators.getQuestionsNoResult());
      return;
    }

    const questions = data.results.map((result) => {
      const getMultipleChoiceQuestionOptions = (
        correctAnswer,
        allIncorrectAnswers,
      ) => {
        const incorrectAnswers = allIncorrectAnswers.filter(
          (incorrectAnswer) => incorrectAnswer,
        );

        const array = [correctAnswer, ...Object.values(incorrectAnswers)];

        return shuffleArray(array);
      };

      return {
        ...result,
        question: result.question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&'),
        incorrectAnswers: result.incorrect_answers,
        correctAnswer: result.correct_answer,
        options:
          result.type === CONSTANTS.VALUES.QUESTION_MULTIPLE_CHOICE
            ? getMultipleChoiceQuestionOptions(
              result.correct_answer,
              result.incorrect_answers,
            )
            : null,
      };
    });

    yield put(QuestionsCreators.getQuestionsSuccess(questions));
  } catch (err) {
    yield put(QuestionsCreators.getQuestionsFailure());
  }
}
