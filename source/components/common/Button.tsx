import React from 'react';
import styled from 'styled-components';

export interface IButtonProps {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  outline: 0;
  background-color: ${({ theme }) => theme.dimmedBackgroundColor};
  border: 1px solid ${({ theme }) => theme.dimmedBackgroundColor};
  height: 30px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
  transition: border-color 0.5s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    border-color: ${({ theme }) => theme.primaryTextColor};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Button: React.FC<IButtonProps> = ({ children, onClick, disabled }) => (
  <ButtonWrapper onClick={onClick} disabled={disabled}>
    {children}
  </ButtonWrapper>
);

export default Button;
