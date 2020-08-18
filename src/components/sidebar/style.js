import styled from "styled-components";

const SidebarStyle = styled.div`
  position: fixed;
  width: 50px;
  height: 100%;
  background: ${props => props.color.sidebar.bg};
  ul {
    list-style-type: none;
    padding: 0;
    height: 100%;
    margin: 0;
    li {
      margin-top: 8px;
      border-radius: 50%;
      background: ${props => props.color.sidebar.menuBg};
      height: 36px;
      width: 36px;
      margin-left: auto;
      margin-right: auto;
      &.stick-bottom {
        position: fixed;
        bottom: 0;
        margin: 8px;
      }
    }
  }
`;

export { SidebarStyle };
