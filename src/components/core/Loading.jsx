import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import srcLoadingIcon from '../../assets/icons/loading.gif';

const Styled = styled.div``;

const LoadingIcon = (props) => {
  return (
    <Styled
      className='icon loading-icon'
      style={{
        width: props?.size || '20px',
        height: props?.size || '20px',
      }}
    >
      <img src={srcLoadingIcon} alt='loading-icon' />
    </Styled>
  );
};

LoadingIcon.propTypes = {
  size: PropTypes.string,
};

export default React.memo(LoadingIcon);
