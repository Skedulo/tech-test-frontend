import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  height: 70px;
  background: #469af9;
  display: flex;
  align-items: center;
  padding: 20px;
  .header-title {
    color: #fff;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
  }
`;

const Header = React.memo(() => {
  return (
    <Styled className='header'>
      <p className='header-title'>Header</p>
    </Styled>
  );
});

export default Header;
