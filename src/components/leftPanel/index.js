import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = styled.div`
  background-color: #283448;
  max-height: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  width: 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  .bottom {
    margin-top: auto;
  }
  .panel-item {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #c3c3c3;
    margin-bottom: 10px;
    :last-child {
      margin-bottom: unset;
    }
  }
`;

const Item = React.memo((props) => {
  return <div className='panel-item'></div>;
});

const LeftPanel = (props) => {
  return (
    <Styled className='left-panel'>
      <div className='top'>
        {[...Array(4)].map((item) => (
          <Item key={item} />
        ))}
      </div>
      <div className='bottom'>
        <Item />
      </div>
    </Styled>
  );
};

LeftPanel.propTypes = {};

export default React.memo(LeftPanel);
