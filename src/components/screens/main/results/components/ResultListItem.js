// @flow

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import appStyles from '../../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${({ isLast, theme }) => (isLast ? theme.metrics.getHeightFromDP('18%') : theme.metrics.mediumSize)}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.contrastColor};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const TextContentWrapper = styled(View)`
  width: 80%;
`;

const IconWrapper = styled(View)`
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const AnswersContentWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.secondaryTextColor};
`;

const QuestionText = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.textColor};
`;

const AnswerText = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
`;

type Result = {
  correctAnswer: string,
  userAnswer: string,
  isCorrect: boolean,
  question: string,
  isLast: boolean,
};

const ResultItemList = ({
  correctAnswer,
  userAnswer,
  isCorrect,
  question,
  isLast,
}: Result) => {
  const { color, icon } = isCorrect
    ? { color: appStyles.colors.green, icon: 'check-circle-outline' }
    : { color: appStyles.colors.accentColor, icon: 'close-circle-outline' };

  return (
    <Wrapper
      isLast={isLast}
    >
      <IconWrapper>
        <MaterialCommunityIcons
          size={appStyles.metrics.getWidthFromDP('12%')}
          color={color}
          name={icon}
        />
      </IconWrapper>
      <TextContentWrapper>
        <QuestionText>{question}</QuestionText>
        <AnswersContentWrapper>
          <AnswerText>{`Answer: ${correctAnswer}`}</AnswerText>
          <LineDivider />
          <AnswerText>{`Your Answer: ${userAnswer}`}</AnswerText>
        </AnswersContentWrapper>
      </TextContentWrapper>
    </Wrapper>
  );
};

export default ResultItemList;
