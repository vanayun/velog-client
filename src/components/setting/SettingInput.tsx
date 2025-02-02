import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

export type SettingInputProps = {
  fullWidth?: boolean;
} & Omit<HTMLProps<HTMLInputElement>, 'ref' | 'as'>;

function SettingInput(props: SettingInputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input<{ fullWidth?: boolean }>`
  display: block;
  border: 1px solid ${palette.gray3};
  background: white;
  padding: 0.5rem;
  color: ${palette.gray7};
  font-size: 1rem;
  line-height: 1rem;
  outline: none;
  &:focus {
    border: 1px solid ${palette.gray9};
  }
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

export default SettingInput;
