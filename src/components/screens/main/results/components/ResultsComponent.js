// @flow

import React from 'react';
import { FlatList, Alert, View } from 'react-native';
import styled from 'styled-components';

import NavigationButton from '../../../../common/NavigationButton';
import TitleText from '../../../../common/TitleText';
import ResultListItem from './ResultListItem';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const NavigationButtonWrapper = styled(View)`
  position: absolute;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('87%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ResultsList = styled(FlatList)`
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Result = {
  correctAnswer: string,
  userAnswer: string,
  isCorrect: boolean,
  question: string,
  type: string,
};

type Props = {
  onPressPlayAgain: Function,
  results: Array<Result>,
  scores: string,
};

const renderQuestionsList = (results: Array<Result>) => (
  <ResultsList
    renderItem={({ item, index }) => (
      <ResultListItem
        isLast={index === results.length - 1}
        correctAnswer={item.correctAnswer}
        userAnswer={item.userAnswer}
        isCorrect={item.isCorrect}
        question={item.question}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item) => item.question}
    data={results}
  />
);

const ResultsComponent = ({ onPressPlayAgain, scores, results }: Props) => {
  const onPressPlayAgainButton = () => {
    Alert.alert(
      'Play Again',
      'Do you want to play the Trivia Challenge again?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => onPressPlayAgain() },
      ],
      { cancelable: false },
    );
  };

  return (
    <Wrapper>
      <TitleText>{`You Scored ${scores}!`}</TitleText>
      {renderQuestionsList(results)}
      <NavigationButtonWrapper>
        <NavigationButton
          onPress={onPressPlayAgainButton}
          isDisabled={false}
          text="PLAY AGAIN"
        />
      </NavigationButtonWrapper>
    </Wrapper>
  );
};

export default ResultsComponent;
