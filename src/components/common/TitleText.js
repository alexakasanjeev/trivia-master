// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')};
  font-family: CircularStd-Black;
  text-align: center;
`;

type Props = {
  children: string,
};

const TitleText = ({ children }: Props) => <Title>{children}</Title>;

export default TitleText;
