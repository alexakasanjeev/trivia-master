// @flow

import React, { memo } from 'react';
import {
  StyleSheet, FlatList, Text, View,
} from 'react-native';
import styled from 'styled-components';

import MultipleChoiceQuestionListItem from './MultipleChoiceQuestionListItem';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
`;

const OptionsList = styled(FlatList)`
  background-color: ${({ theme }) => theme.colors.contrastColor};
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const OptionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  onSelectAnswer: Function,
  options: Array<string>,
  selectedAnswer: string,
  question: string,
};

const checkShouldComponentUpdate = (prevState, nextState) => {
  const { selectedAnswer } = nextState;
  const { options } = prevState;

  return !options.includes(selectedAnswer);
};

const MultipleChoiceQuestion = memo<Props>(
  ({
    onSelectAnswer, selectedAnswer, question, options,
  }: Props) => (
    <Wrapper>
      <OptionText>{question}</OptionText>
      <OptionsList
        renderItem={({ item }) => (
          <MultipleChoiceQuestionListItem
            isSelected={selectedAnswer === item}
            onSelectAnswer={onSelectAnswer}
            option={item}
          />
        )}
        ItemSeparatorComponent={() => <LineDivider />}
        keyExtractor={(item) => item}
        alwaysBounceVertical={false}
        data={options}
      />
    </Wrapper>
  ),
  checkShouldComponentUpdate,
);

export default MultipleChoiceQuestion;
