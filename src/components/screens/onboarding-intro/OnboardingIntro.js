// @flow

import React, { useState, useRef } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import onboardingIntroItems from '../../../data/onboardingIntroItems';
import MiddleContent from './components/MiddleContent';
import BottomContent from './components/BottomContent';
import CONSTANTS from '../../../utils/constants';
import appStyles from '../../../styles';

const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const IntroScreenWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.height}px;
`;

type Props = {
  navigation: {
    navigate: Function,
  },
};

type OnboardingIntroListRef = {
  current: {
    scrollToIndex: Function,
  },
};

const OnboardingIntro = ({ navigation }: Props) => {
  const onboardingIntroListRef: OnboardingIntroListRef = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const onPressNextButton = () => {
    const nextIndex = currentPageIndex + 1;

    onboardingIntroListRef.current.scrollToIndex({
      animated: true,
      index: nextIndex,
    });

    setCurrentPageIndex(nextIndex);
  };

  const onPressPreviousButton = () => {
    const nextIndex = currentPageIndex - 1;

    onboardingIntroListRef.current.scrollToIndex({
      animated: true,
      index: nextIndex,
    });

    setCurrentPageIndex(nextIndex);
  };

  const onFlatlistMomentumScrollEnd = (event: Object): void => {
    const { contentOffset } = event.nativeEvent;

    const isHorizontalSwipeMovement = contentOffset.x > 0;
    const nextIndex = isHorizontalSwipeMovement
      ? Math.ceil(contentOffset.x / appStyles.metrics.width)
      : 0;

    setCurrentPageIndex(nextIndex);
  };

  return (
    <Wrapper>
      <FlatList
        onMomentumScrollEnd={(event) => onFlatlistMomentumScrollEnd(event)}
        renderItem={({ item }) => (
          <IntroScreenWrapper>
            <MiddleContent
              description={item.description}
              title={item.title}
              icon={item.icon}
            />
          </IntroScreenWrapper>
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        ref={onboardingIntroListRef}
        data={onboardingIntroItems}
        bounces={false}
        pagingEnabled
        horizontal
      />
      <BottomContent
        onPressSkip={() => navigation.navigate(CONSTANTS.ROUTES.MAIN_SCENE)}
        pagesLength={onboardingIntroItems.length}
        onPressPrevious={onPressPreviousButton}
        onPressNext={onPressNextButton}
        currentIndex={currentPageIndex}
      />
    </Wrapper>
  );
};

export default OnboardingIntro;
