import React from "react"
import { HeaderStyle } from "./style"

function Header(props) {
  const { color } = props;
  return (
    <HeaderStyle
      color={color}
    >
      <div className="child-component">
        { props.children }
      </div>
    </HeaderStyle>
  );
}

export default Header;
