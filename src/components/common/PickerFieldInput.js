// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import appStyles from '../../styles';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.contrastColor};
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const OptionText = styled(Text).attrs({
  numberOfLines: 1,
})`
  width: 85%;
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  onSelectOption: Function,
  optionSelected: string,
};

const PickerFieldInput = ({ optionSelected, onSelectOption }: Props) => (
  <Wrapper
    onPress={onSelectOption}
  >
    <OptionText>{optionSelected}</OptionText>
    <MaterialCommunityIcons
      size={appStyles.metrics.getWidthFromDP('7%')}
      color={appStyles.colors.white}
      name="chevron-down-box"
    />
  </Wrapper>
);

export default PickerFieldInput;
