import React from 'react';
import styled from 'styled-components';
import { Loader5 } from 'styled-icons/remix-fill/Loader5';

export interface ILoaderProps {
  size?: number;
}

const Spinner = styled(Loader5)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
  height: ${({ size }) => size}px;
`;

const Loader: React.FC<ILoaderProps> = ({ size }) => <Spinner size={size} />;

export default Loader;
