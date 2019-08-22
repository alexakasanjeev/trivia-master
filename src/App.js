// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import AppNavigation from './routes';
import appStyles from './styles';
import store from './store';

const App = () => (
  <Provider
    store={store}
  >
    <StatusBar
      backgroundColor={appStyles.colors.primaryColor}
      barStyle="light-content"
    />
    <ThemeProvider
      theme={appStyles}
    >
      <AppNavigation />
    </ThemeProvider>
  </Provider>
);

export default App;
