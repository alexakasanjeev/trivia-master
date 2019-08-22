// @flow

import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import NavigationButton from './NavigationButton';
import SubtitleText from './SubtitleText';
import appStyles from '../../styles';
import TitleText from './TitleText';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 90%;
  justify-content: space-between;
  align-items: center;
`;

const TextContentWrapper = styled(View)`
  height: 25%;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

type Props = {
  onPressHelperButton: Function,
  helperButtonTitle: string,
  message: string,
  title: string,
  icon: string,
};

const ErrroMessage = ({
  onPressHelperButton,
  helperButtonTitle,
  message,
  title,
  icon,
}: Props) => (
  <Wrapper>
    <ContentWrapper>
      <MaterialCommunityIcons
        size={appStyles.metrics.getWidthFromDP('35%')}
        color={appStyles.colors.textColor}
        name={icon}
      />
      <TextContentWrapper>
        <TitleText>{title}</TitleText>
        <SubtitleText>{message}</SubtitleText>
      </TextContentWrapper>
      <NavigationButton
        onPress={onPressHelperButton}
        text={helperButtonTitle}
        isDisabled={false}
      />
    </ContentWrapper>
  </Wrapper>
);

export default ErrroMessage;
