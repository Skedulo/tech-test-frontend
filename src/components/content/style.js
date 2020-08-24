import styled from 'styled-components';

const ContentStyle = styled.div`
  width: calc(100% - 50px);
  height: calc(100% - 46px);
  margin-left: 50px;
  top: 0;
  left: 0;
  background: ${props => props.color.bg};
  display: flex;
  overflow: hidden;
  .left {
    background: ${props => props.color.secondBg};
  }
  .right {
    background: ${props => props.color.bg};
    
  }
`;

export { ContentStyle };
