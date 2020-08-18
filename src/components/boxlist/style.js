import styled from 'styled-components';

const BoxListStyle = styled.div`
  width: calc(60% - 50px);
  height: 80px;
  margin-left: 50px;
  top: 0;
  left: 0;
  background: ${props => props.color.header.bg};
  .child-component {
    color: ${props => props.color.header.text};
    margin-left: 17px;
    font-size: 26px;
    height: 100%;
    display: flex;
    span {
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`;

export { BoxListStyle };
