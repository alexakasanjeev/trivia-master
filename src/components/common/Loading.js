// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styled from 'styled-components';
import appStyles from '../../styles';

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <LoadingWrapper>
    <ActivityIndicator
      color={appStyles.colors.textColor}
      size="large"
    />
  </LoadingWrapper>
);

export default Loading;
