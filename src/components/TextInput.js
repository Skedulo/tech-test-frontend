import React from "react";
import styled from "@emotion/styled";

const InputWrapper = styled.div(
  ({ theme }) => `
display: flex;
flex-direction: row;
align-items: center;
background-color: ${theme.background.contrastLow};
padding-left: ${theme.spacing.sm}
`
);

const Input = styled.input(
  ({ theme }) => `
    color: ${theme.background.contrast};
    font-size: ${theme.fontSize.base};
    background-color: transparent;
    border: none;
    border-radius: 2px;
    line-height: 2;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    outline: none;
  `
);

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const TextInput = ({ label, name, ...otherProps }) => (
  <InputWrapper>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} {...otherProps} />
  </InputWrapper>
);

export default TextInput;
