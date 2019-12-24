import React from 'react';
import styled from 'styled-components';

export interface ITextProps {
  children: React.ReactNode;
  className?: string;
}

const TextWrapper = styled.span`
  color: ${({ theme }) => theme.primaryTextColor};
`;

const Text: React.FC<ITextProps> = ({ children, className }) => (
  <TextWrapper className={className}>{children}</TextWrapper>
);

export default Text;
