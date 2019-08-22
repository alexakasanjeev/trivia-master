// @flow

import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SettingQuestions from '../components/screens/main/setup-questions/SetupQuestions';
import Questions from '../components/screens/main/questions/Questions';
import Welcome from '../components/screens/main/welcome/Welcome';
import Results from '../components/screens/main/results/Results';
import HeaderButton from '../components/common/HeaderButton';
import CONSTANTS from '../utils/constants';
import appStyles from '../styles';

const LOCAL_STACK_ROUTES = {
  SETUP_QUESTIONS: 'SETUP_QUESTIONS',
  QUESTIONS: 'QUESTIONS',
  WELCOME: 'WELCOME',
  RESULTS: 'RESULTS',
};

const MainScene = createStackNavigator(
  {
    [LOCAL_STACK_ROUTES.WELCOME]: {
      screen: (props) => (
        <Welcome
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: {
        headerBackTitle: null,
        header: null,
      },
    },

    [LOCAL_STACK_ROUTES.SETUP_QUESTIONS]: {
      screen: (props) => (
        <SettingQuestions
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: {
        headerBackTitle: null,
        header: null,
      },
    },

    [LOCAL_STACK_ROUTES.QUESTIONS]: {
      screen: (props) => (
        <Questions
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: (props) => {
        const navigationParams = props.navigation.state.params;
        const shouldShowRestartButton = navigationParams
          && navigationParams[
            CONSTANTS.PARAMS.SHOULD_SHOW_QUESTIONS_RESTART_BUTTON
          ];
        const onRestartQuestions = navigationParams
          && navigationParams[CONSTANTS.PARAMS.RESTART_QUESTIONS];

        return {
          headerRight: shouldShowRestartButton && (
            <HeaderButton
              size={appStyles.metrics.getWidthFromDP('8%')}
              onPress={() => {
                if (onRestartQuestions) {
                  onRestartQuestions();
                }
              }}
              icon="restart"
            />
          ),
          headerTintColor: appStyles.colors.textColor,
          headerStyle: {
            backgroundColor: appStyles.colors.primaryColor,
            borderBottomWidth: 0,
            elevation: 0,
          },
        };
      },
    },

    [LOCAL_STACK_ROUTES.RESULTS]: {
      screen: Results,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: LOCAL_STACK_ROUTES.WELCOME,
    headerMode: 'screen',
  },
);

export default MainScene;
