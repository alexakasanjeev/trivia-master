// @flow

import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Types as QuestionsTypes } from '../../../../store/ducks/questions';
import QuestionsComponent from './components/QuestionsComponent';

import CONSTANTS from '../../../../utils/constants';

type QuestionListRef = {
  current: {
    scrollToIndex: Function,
  },
};

type Navigation = {
  setParams: Function,
  navigate: Function,
  pop: Function,
  state: {
    params: Object,
  },
};

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Navigation,
};

const Questions = ({ LOCAL_STACK_ROUTES, navigation }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const {
    loading, noResult, error, data,
  } = useSelector(
    (state) => state.questions,
  );

  const questionsListRef: QuestionListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      [CONSTANTS.PARAMS.SHOULD_SHOW_QUESTIONS_RESTART_BUTTON]:
        !loading && !error && !noResult,
    });
  }, [loading, error]);

  useEffect(
    () => () => {
      dispatch({ type: QuestionsTypes.RESET_STATE });
    },
    [],
  );

  const getQuestions = () => dispatch({
    type: QuestionsTypes.GET_QUESTIONS_REQUEST,
    payload: navigation.state.params,
  });

  const onRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswers([]);

    questionsListRef.current.scrollToIndex({ animated: true, index: 0 });
  };

  useEffect(() => {
    navigation.setParams({
      [CONSTANTS.PARAMS.RESTART_QUESTIONS]: onRestart,
    });

    getQuestions();
  }, []);

  const onSelectAnswer = useCallback((answer: string): void => {
    if (answer !== selectedAnswer) {
      setSelectedAnswer(answer);
    }
  }, []);

  const onPressNavigationButton = (): void => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= data.length) {
      navigation.navigate(LOCAL_STACK_ROUTES.RESULTS, {
        [CONSTANTS.PARAMS.USER_ANSWERS]: [...userAnswers, selectedAnswer],
      });

      return;
    }

    setUserAnswers([...userAnswers, selectedAnswer]);
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer('');

    questionsListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  };

  return (
    <QuestionsComponent
      onChangeParametersButtonPressed={() => navigation.pop()}
      onPressNavigationButton={onPressNavigationButton}
      currentQuestionIndex={currentQuestionIndex}
      questionsListRef={questionsListRef}
      onSelectAnswer={onSelectAnswer}
      selectedAnswer={selectedAnswer}
      getQuestions={getQuestions}
      noResult={noResult}
      loading={loading}
      questions={data}
      error={error}
    />
  );
};

export default Questions;
