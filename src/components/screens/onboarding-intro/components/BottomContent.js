// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import TitleText from '../../../common/TitleText';

const DotsWrapper = styled(View)`
  justify-content: space-between;
  flex-direction: row;
`;

const PaginationDot = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.secondaryColor : theme.colors.primaryColor)};
`;

const ButtonsWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.contrastColor};
`;

const GetStartedButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const Button = styled(TouchableOpacity)`
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  onPressPrevious: Function,
  onPressNext: Function,
  onPressSkip: Function,
  currentIndex: number,
  pagesLength: number,
};

const BottomContent = ({
  onPressPrevious,
  currentIndex,
  onPressSkip,
  pagesLength,
  onPressNext,
}: Props) => {
  const renderControlButtons = (): Object => {
    const { leftButtonTitle, leftButtonAction } = currentIndex === 0
      ? { leftButtonTitle: 'SKIP', leftButtonAction: onPressSkip }
      : { leftButtonTitle: 'PREV', leftButtonAction: onPressPrevious };

    return (
      <ButtonsWrapper>
        <Button
          onPress={leftButtonAction}
        >
          <TitleText>{leftButtonTitle}</TitleText>
        </Button>
        <DotsWrapper>
          {Array(pagesLength)
            .fill({})
            .map((_, index) => (
              <PaginationDot
                isSelected={index === currentIndex}
                key={`DOT${index - 1}`}
              >
                {'\u2022'}
              </PaginationDot>
            ))}
        </DotsWrapper>
        <Button
          onPress={onPressNext}
        >
          <TitleText>NEXT</TitleText>
        </Button>
      </ButtonsWrapper>
    );
  };

  return (
    <>
      {currentIndex === pagesLength - 1 ? (
        <GetStartedButton
          onPress={onPressSkip}
        >
          <TitleText>GET STARTED</TitleText>
        </GetStartedButton>
      ) : (
        renderControlButtons()
      )}
    </>
  );
};

export default BottomContent;
