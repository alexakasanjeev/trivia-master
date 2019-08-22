// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import TitleText from './TitleText';

const ContentWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
`;

type Props = {
  isDisabled: boolean,
  onPress: Function,
  text: string,
};

const NavigationButton = ({ isDisabled, onPress, text }: Props) => (
  <ContentWrapper
    isDisabled={isDisabled}
    disabled={isDisabled}
    onPress={onPress}
  >
    <TitleText>{text}</TitleText>
  </ContentWrapper>
);

export default NavigationButton;
