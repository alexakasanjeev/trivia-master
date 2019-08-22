// @flow

import React, { useRef } from 'react';
import {
  Platform, Modal, View, Text,
} from 'react-native';
import Slider from '@react-native-community/slider';
import styled from 'styled-components';

import PickerFieldInput from '../../../../common/PickerFieldInput';
import NavigationButton from '../../../../common/NavigationButton';
import Picker from '../../../../common/picker/Picker';
import appStyles from '../../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const OptionsWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
`;

const OptionLabel = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Bold;
  text-align: ${({ centerAligned }) => (centerAligned ? 'center' : 'left')};
`;

const NumberOfQuestionsText = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
`;

const NumberQuestionsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  onSetNumberQuestions: Function,
  onSelectPickerItem: Function,
  onPressStartButton: Function,
  onToggelModal: Function,
  pickerSelected: Object,
  amountSelected: number,
  isModalOpen: boolean,
  items: Array<Object>,
};

const SetupQuestionsComponent = ({
  onSetNumberQuestions,
  onSelectPickerItem,
  onPressStartButton,
  pickerSelected,
  amountSelected,
  onToggelModal,
  isModalOpen,
  items,
}: Props) => {
  const numberQuestionsSliderRef: Object = useRef(null);

  return (
    <Wrapper>
      {items.map((item) => (
        <OptionsWrapper
          key={item.field}
        >
          <OptionLabel>{item.label}</OptionLabel>
          <PickerFieldInput
            onSelectOption={() => onSelectPickerItem(item)}
            optionSelected={item.itemSelected.label}
          />
        </OptionsWrapper>
      ))}
      <OptionsWrapper>
        <OptionLabel>Number of Questions</OptionLabel>
        <OptionLabel
          centerAligned
        >
          {amountSelected}
        </OptionLabel>
        <Slider
          onLayout={() => numberQuestionsSliderRef.current.setNativeProps({
            value: amountSelected,
          })}
          onValueChange={(distance) => onSetNumberQuestions(distance)}
          maximumTrackTintColor={appStyles.colors.contrastColor}
          minimumTrackTintColor={appStyles.colors.white}
          thumbTintColor={Platform.select({
            android: appStyles.colors.white,
            ios: '',
          })}
          ref={numberQuestionsSliderRef}
          maximumValue={50}
          minimumValue={1}
          step={1}
        />
        <NumberQuestionsWrapper>
          <NumberOfQuestionsText>1</NumberOfQuestionsText>
          <NumberOfQuestionsText>50</NumberOfQuestionsText>
        </NumberQuestionsWrapper>
      </OptionsWrapper>
      {isModalOpen && pickerSelected && (
        <Modal
          onRequestClose={onToggelModal}
          animationType="slide"
          hardwareAccelerated
          transparent
        >
          <Picker
            pickerSelected={pickerSelected}
            onToggelModal={onToggelModal}
          />
        </Modal>
      )}
      <NavigationButton
        onPress={onPressStartButton}
        isDisabled={false}
        text="START"
      />
    </Wrapper>
  );
};

export default SetupQuestionsComponent;
