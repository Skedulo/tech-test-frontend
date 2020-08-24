import styled from 'styled-components';

const BoxListStyle = styled.div`
  width: 60%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${props => props.color.bg};
  .box-list {
    height: 100%;
    overflow-y: scroll;
    .box {
      height: 150px;
      margin: 20px;
      background: ${props => props.color.secondBg}
    }
  }
`;

export { BoxListStyle };
