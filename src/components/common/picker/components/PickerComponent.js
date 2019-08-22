// @flow

import React from 'react';
import {
  FlatList, View, StyleSheet, Text,
} from 'react-native';
import styled from 'styled-components';

import ConfirmButton from '../../NavigationButton';
import PickerListItem from './PickerListItem';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const OptionsListWrapper = styled(View)`
  width: 100%;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('55%')};
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const ConfirmButtonWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  align-self: center;
`;

const LineDivider = styled(View)`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const SelectText = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')};
  font-family: CircularStd-Black;
`;

type Value = {
  label: string,
  value: string,
};

type Props = {
  onPressConfirmButton: Function,
  onSelectItem: Function,
  selectionLabel: string,
  values: Array<Value>,
  itemSelected: Value,
};

const PickerComponent = ({
  onPressConfirmButton,
  selectionLabel,
  onSelectItem,
  itemSelected,
  values,
}: Props) => {
  const renderOptionsList = () => (
    <OptionsListWrapper>
      <FlatList
        renderItem={({ item }) => (
          <PickerListItem
            isSelected={itemSelected.value === item.value}
            onPressItem={() => onSelectItem({ ...item })}
            value={item.value}
            label={item.label}
          />
        )}
        ItemSeparatorComponent={() => <LineDivider />}
        keyExtractor={(item) => item.value}
        data={values}
      />
    </OptionsListWrapper>
  );

  return (
    <Wrapper>
      <SelectText>{selectionLabel}</SelectText>
      {renderOptionsList()}
      <ConfirmButtonWrapper>
        <ConfirmButton
          onPress={onPressConfirmButton}
          isDisabled={false}
          text="SELECT"
        />
      </ConfirmButtonWrapper>
    </Wrapper>
  );
};

export default PickerComponent;
