// @flow

import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import appStyles from '../../styles';

type Props = {
  onPress: Function,
  icon: string,
  size: number,
};

const Wrapper = styled(TouchableOpacity)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.extraSmallSize : 0)}px;
`;

const HeaderButton = ({ onPress, size, icon }: Props) => (
  <Wrapper
    onPress={onPress}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
  >
    <MaterialCommunityIcons
      color={appStyles.colors.textColor}
      size={size}
      name={icon}
    />
  </Wrapper>
);

export default HeaderButton;
