import styled from 'styled-components';

const LabelFieldStyle = styled.label`
  &.label {
    position: absolute;
    top: 4px;
    left: 22px;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
    margin: 0;
  }

  &.labelError {
    color: ${(props) => props.theme.label.errorText};
  }

  &.active {
    opacity: 1;
    color: ${(props) => props.theme.label.text};
    background-color: transparent;
    box-shadow: none;
    &.labelError {
      color: ${(props) => props.theme.label.errorText};
    }
  }
`;

export { LabelFieldStyle };
