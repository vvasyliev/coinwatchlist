import React from 'react';
import styled from 'styled-components';

const ButtonGroupWrapper = styled.div`
  & button:first-child:not(:only-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  & button:last-child:not(:only-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const ButtonGroup: React.FC = ({ children }) => <ButtonGroupWrapper>{children}</ButtonGroupWrapper>;

export default ButtonGroup;
