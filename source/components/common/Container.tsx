import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: ${({ theme }) => theme.breakpoints.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.breakpoints.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: ${({ theme }) => theme.breakpoints.xl};
  }
`;

const Container: React.FC = ({ children }) => <ContainerWrapper>{children}</ContainerWrapper>;

export default Container;
