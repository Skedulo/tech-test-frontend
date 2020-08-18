import React from "react"
import { BoxListStyle } from "./style"

function BoxList(props) {
  const { color } = props;
  return (
    <BoxListStyle
      color={color}
    >
      <div className="child-component">
        { props.children }
      </div>
    </BoxListStyle>
  );
}

export default BoxList;
