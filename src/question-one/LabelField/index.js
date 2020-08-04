import React from "react";
import PropTypes from 'prop-types';
import { LabelFieldStyle } from "./style";

const LabelField = (props) => {
  const {
    name,
    required,
    label,
    error,
    theme,
    touched,
    active
  } = props;
  const showError = error && touched;
  const combinedClass = `label ${showError ? 'labelError' : ''} ${active ? 'active' : ''}`
  return (
    <LabelFieldStyle htmlFor={name} className={combinedClass} theme={theme}>
      {`${label} ${required ? ' *' : ''}`}
      {showError ? `- ${error}` : ''}
    </LabelFieldStyle>
  );
}

LabelField.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  theme: PropTypes.object,
  touched: PropTypes.bool,
  active: PropTypes.bool
}

LabelField.defaultProps = {
  name: '',
  required: false,
  label: '',
  error: '',
  theme: {},
  touched: false,
  active: false
}

export default LabelField;