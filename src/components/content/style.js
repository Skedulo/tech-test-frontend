import styled from 'styled-components';

const ContentStyle = styled.div`
  width: calc(100% - 50px);
  height: 80px;
  margin-left: 50px;
  top: 0;
  left: 0;
  background: ${props => props.color.bg};
  display: flex;
  .left {
    background: ${props => props.color.secondBg};
    
  }
  .right {
    background: ${props => props.color.bg};
    
  }
`;

export { ContentStyle };
