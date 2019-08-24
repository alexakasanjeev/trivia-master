// @flow

import React, { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Types as ResultsTypes } from '../../../../store/ducks/results';
import ResultsComponent from './components/ResultsComponent';
import CONSTANTS from '../../../../utils/constants';

type Props = {
  navigation: {
    addListener: Function,
    dispatch: Function,
    pop: Function,
    state: {
      params: Object,
    },
  },
};

const Results = ({ navigation }: Props) => {
  const data = useSelector((state) => state.results.data);
  const scores = useSelector((state) => state.results.scores);
  const dispatch = useDispatch();

  useEffect(() => {
    const userAnswers = navigation.state.params[CONSTANTS.PARAMS.USER_ANSWERS];

    dispatch({ type: ResultsTypes.GET_RESULTS, payload: userAnswers });
  }, []);

  const onBackButtonPressAndroid = useCallback(() => {
    navigation.pop(2);
    return true;
  }, []);

  useEffect(() => {
    const didFocusSubscription = navigation.addListener('didFocus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      );
    });

    return () => {
      if (didFocusSubscription) {
        didFocusSubscription.remove();
      }
    };
  }, [navigation]);

  return (
    <ResultsComponent
      onPressPlayAgain={() => navigation.pop(2)}
      scores={scores}
      results={data}
    />
  );
};

export default Results;
