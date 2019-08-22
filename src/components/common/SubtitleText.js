// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Subtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Medium;
  text-align: center;
`;

type Props = {
  children: string,
};

const SubTitleText = ({ children }: Props) => <Subtitle>{children}</Subtitle>;

export default SubTitleText;
