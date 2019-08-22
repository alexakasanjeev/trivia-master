// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import TitleText from './TitleText';

const Wrapper = styled(TouchableOpacity)`
  height: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ isSelected, theme }) => (isSelected
    ? theme.colors.selectedBooleanOption
    : theme.colors.contrastColor)};
`;

type Props = {
  isSelected: boolean,
  onPress: Function,
  text: string,
};

const BooleanButton = ({ isSelected, onPress, text }: Props) => (
  <Wrapper
    isSelected={isSelected}
    onPress={onPress}
  >
    <TitleText>{text}</TitleText>
  </Wrapper>
);

export default BooleanButton;
