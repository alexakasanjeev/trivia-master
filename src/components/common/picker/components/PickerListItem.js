// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const OptionText = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.accentColor : theme.colors.primaryColor)};
`;

type Props = {
  onPressItem: Function,
  isSelected: boolean,
  label: string,
  value: string,
};

const Picker = ({
  onPressItem, isSelected, label, value,
}: Props) => (
  <Wrapper
    onPress={() => onPressItem(value)}
  >
    <OptionText
      isSelected={isSelected}
    >
      {label}
    </OptionText>
  </Wrapper>
);

export default Picker;
