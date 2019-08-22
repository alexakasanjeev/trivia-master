// @fow

import React, { useMemo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const OptionText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 80%;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.accentColor : theme.colors.textColor)};
`;

type Props = {
  onSelectAnswer: Function,
  isSelected: boolean,
  option: string,
};

const MultipleChoiceQuestionListItem = ({
  isSelected,
  onSelectAnswer,
  option,
}: Props) => useMemo(
  () => (
    <Wrapper
      onPress={() => onSelectAnswer(option)}
    >
      <MaterialCommunityIcons
        size={appStyles.metrics.getWidthFromDP('8%')}
        color={appStyles.colors.textColor}
        style={{
          margin: appStyles.metrics.largeSize,
        }}
        name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
      />
      <OptionText>{option}</OptionText>
    </Wrapper>
  ),
  [isSelected],
);

export default MultipleChoiceQuestionListItem;
