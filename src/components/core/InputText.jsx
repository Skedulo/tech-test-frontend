import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = styled.div`
  position: relative;
  height: 40px;
  margin: 15px 0;
  input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    border: solid 0.5px #ececec;
    border-radius: 10px;
    padding: 10px;
  }
`;

const InputText = React.memo((props) => {
  const { onChange, placeholder } = props;
  return (
    <Styled className='input-container'>
      <input type='text' onChange={onChange} placeholder={placeholder} />
    </Styled>
  );
});

InputText.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputText;
