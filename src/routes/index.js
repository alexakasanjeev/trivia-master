// @flow

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import OnboardingIntro from '../components/screens/onboarding-intro/OnboardingIntro';
import MainScene from './mainScene';
import CONSTANTS from '../utils/constants';

const InitalScene = createSwitchNavigator(
  {
    [CONSTANTS.ROUTES.ONBOARDING_INTRO]: {
      screen: OnboardingIntro,
    },

    [CONSTANTS.ROUTES.MAIN_SCENE]: {
      screen: MainScene,
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.ONBOARDING_INTRO,
  },
);

const AppContainer = createAppContainer(InitalScene);

export default AppContainer;
