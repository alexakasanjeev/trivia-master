// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import MultipleChoiceQuestions from './multiple-choice-questions/MultipleChoiceQuestion';
import NavigationButton from '../../../../common/NavigationButton';
import ErrorMessage from '../../../../common/ErrorMessage';
import CONSTANTS from '../../../../../utils/constants';
import TitleText from '../../../../common/TitleText';
import Loading from '../../../../common/Loading';
import BooleanQuestions from './BooleanQuestion';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const TopContent = styled(View)`
  width: 100%;
  height: 12%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  justify-content: space-between;
`;

const ContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const NavigationButtonWrapper = styled(View)`
  width: 40%;
  justify-content: center;
`;

type Question = {
  incorrectAnswers: Array<string>,
  correctAnswer: string,
  difficulty: string,
  category: string,
  question: string,
  type: string,
};

type Props = {
  onChangeParametersButtonPressed: Function,
  onPressNavigationButton: Function,
  currentQuestionIndex: number,
  questions: Array<Question>,
  onSelectAnswer: Function,
  questionsListRef: Object,
  getQuestions: Function,
  selectedAnswer: string,
  noResult: boolean,
  loading: boolean,
  error: boolean,
};

const QuestionsComponent = ({
  onChangeParametersButtonPressed,
  onPressNavigationButton,
  currentQuestionIndex,
  questionsListRef,
  onSelectAnswer,
  selectedAnswer,
  getQuestions,
  noResult,
  questions,
  loading,
  error,
}: Props) => {
  const currentQuestionCategory = questions[currentQuestionIndex] && questions[currentQuestionIndex].category;
  const navigationButtonTitle = currentQuestionIndex + 1 === questions.length ? 'FINISH' : 'NEXT';
  const questionIndex = `${currentQuestionIndex + 1}/${questions.length}`;
  const hasDataToShow = !loading && !error && questions.length > 0;

  const renderQuestionsList = () => (
    <FlatList
      renderItem={({ item, index }) => (
        <ContentWrapper>
          {item.type === CONSTANTS.VALUES.QUESTION_BOOLEAN && (
            <BooleanQuestions
              isQuestionFocused={currentQuestionIndex === index}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={onSelectAnswer}
              question={item.question}
            />
          )}
          {item.type === CONSTANTS.VALUES.QUESTION_MULTIPLE_CHOICE && (
            <MultipleChoiceQuestions
              selectedAnswer={selectedAnswer}
              onSelectAnswer={onSelectAnswer}
              question={item.question}
              options={item.options}
            />
          )}
        </ContentWrapper>
      )}
      onEndReachedThreshold={0.5}
      maxToRenderPerBatch={1}
      initialNumToRender={1}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.question}
      ref={questionsListRef}
      scrollEnabled={false}
      data={questions}
      pagingEnabled
      horizontal
    />
  );

  return (
    <Wrapper>
      {loading && <Loading />}
      {noResult && (
        <ErrorMessage
          message="Seems like we don't have enough questions for your taste today."
          onPressHelperButton={onChangeParametersButtonPressed}
          helperButtonTitle="CHANGE PARAMETERS"
          icon="playlist-remove"
          title="Wow!"
        />
      )}
      {error && (
        <ErrorMessage
          message="Seems like you're having some troubles when trying to connect with the server."
          onPressHelperButton={getQuestions}
          helperButtonTitle="TRY AGAIN"
          icon="server-network-off"
          title="Oops…"
        />
      )}
      {hasDataToShow && (
        <>
          <TopContent>
            <TitleText>{currentQuestionCategory}</TitleText>
            <TitleText>{questionIndex}</TitleText>
          </TopContent>
          {renderQuestionsList()}
          <NavigationButtonWrapper>
            <NavigationButton
              onPress={onPressNavigationButton}
              text={navigationButtonTitle}
              isDisabled={!selectedAnswer}
            />
          </NavigationButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default QuestionsComponent;
