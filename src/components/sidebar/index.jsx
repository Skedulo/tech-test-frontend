import React from "react";
import { SidebarStyle } from "./style";

const SideBar = (props) => {
  const { color } = props;
  return (
    <SidebarStyle color={color}>
      <ul className="list-item">
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item stick-bottom"></li>
      </ul>
    </SidebarStyle>
  );
}

export default SideBar;
