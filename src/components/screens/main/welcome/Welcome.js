// @flow

import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';

import NavigationButton from '../../../common/NavigationButton';
import SubText from '../../../common/SubtitleText';
import TitleText from '../../../common/TitleText';
import appStyles from '../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const TextContentContainer = styled(View)`
  width: 100%;
  height: 75%;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
`;

const BottomContentContainer = styled(View)`
  height: 25%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
`;

const SupportedByText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => 1.2 * theme.metrics.mediumSize}px;
`;

const SupportedByContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

type Navigation = {
  navigate: Function,
};

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Navigation,
};

/**
  To have access to the menu to choose the types of questions, do the following:
  - Uncomment lines 68 and 74
  - Commenet lines 67 and 73
 */

const Welcome = ({ LOCAL_STACK_ROUTES, navigation }: Props) => (
  <Wrapper>
    <TextContentContainer>
      <TitleText>Welcome to the Trivia Master!</TitleText>
      <SubText>You will be presented with 10 True or False questions.</SubText>
      {/* <SubText>You can choose the type, amount, difficulty and the category of the questions.</SubText> */}
      <TitleText>Can you score 100%?</TitleText>
    </TextContentContainer>
    <BottomContentContainer>
      <NavigationButton
        onPress={() => navigation.navigate(LOCAL_STACK_ROUTES.QUESTIONS)}
        // onPress={() => navigation.navigate(LOCAL_STACK_ROUTES.SETUP_QUESTIONS)}
        text="CHOOSE QUESTIONS"
        isDisabled={false}
      />
      <SupportedByContainer>
        <SupportedByText>SUPPORTED BY</SupportedByText>
        <Image
          style={{
            width: appStyles.metrics.getWidthFromDP('10%'),
            height: appStyles.metrics.getWidthFromDP('10%'),
          }}
          source={require('../../../../../assets/images/g2i.png')}
        />
      </SupportedByContainer>
    </BottomContentContainer>
  </Wrapper>
);

export default Welcome;
