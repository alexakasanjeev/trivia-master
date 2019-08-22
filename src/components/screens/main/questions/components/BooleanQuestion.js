// @flow

import React, { memo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import SquareButton from '../../../../common/SquareButton';
import CONSTANTS from '../../../../../utils/constants';
import TitleText from '../../../../common/TitleText';

const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

const ButtonsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
`;

type Props = {
  isQuestionFocused: boolean,
  onSelectAnswer: Function,
  selectedAnswer: string,
  question: string,
};

const checkShouldComponentUpdate = (_, nextState: Props) => !nextState.isQuestionFocused;

const BooleanQuestion = memo<Props>(
  ({ onSelectAnswer, selectedAnswer, question }: Props) => (
    <Wrapper>
      <TitleText>{question}</TitleText>
      <ButtonsWrapper>
        <SquareButton
          onPress={() => onSelectAnswer(CONSTANTS.VALUES.BOOLEAN_TRUE_VALUE)}
          isSelected={selectedAnswer === CONSTANTS.VALUES.BOOLEAN_TRUE_VALUE}
          text="True"
        />
        <SquareButton
          onPress={() => onSelectAnswer(CONSTANTS.VALUES.BOOLEAN_FALSE_VALUE)}
          isSelected={selectedAnswer === CONSTANTS.VALUES.BOOLEAN_FALSE_VALUE}
          text="False"
        />
      </ButtonsWrapper>
    </Wrapper>
  ),
  checkShouldComponentUpdate,
);

export default BooleanQuestion;
