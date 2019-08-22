// @flow

import React from 'react';
import { Platform, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import TitleText from '../../../common/TitleText';
import appStyles from '../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.mediumSize : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const TextContentWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const Description = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => 1.3 * theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  text-align: center;
`;

type Props = {
  description: string,
  title: string,
  icon: string,
};

const MiddleContent = ({ title, description, icon }: Props): Object => (
  <Wrapper>
    <IconWrapper>
      <MaterialCommunityIcons
        size={appStyles.metrics.getWidthFromDP('35%')}
        color={appStyles.colors.textColor}
        name={icon}
      />
    </IconWrapper>
    <TextContentWrapper>
      <TitleText>{title}</TitleText>
      <Description>{description}</Description>
    </TextContentWrapper>
  </Wrapper>
);

export default MiddleContent;
