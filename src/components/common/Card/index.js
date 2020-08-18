import React from "react";
import PropTypes from 'prop-types';
import { CardStyle } from "./style";

const Card = props => {
  const {
    name,
    required,
    label,
    error,
    theme,
    touched,
    active
  } = props;
  return (
    <CardStyle>
      <div className={ 'swimlane__card ' + (props.className || '') } >
        { props.description }
      </div>
    </CardStyle>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  theme: PropTypes.object,
  touched: PropTypes.bool,
  active: PropTypes.bool
}

Card.defaultProps = {
  name: '',
  required: false,
  label: '',
  error: '',
  theme: {},
  touched: false,
  active: false
}

export default Card;