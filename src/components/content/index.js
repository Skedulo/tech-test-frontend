import React from "react"
import { ContentStyle } from "./style"

function Content(props) {
  const { color } = props;
  return (
    <ContentStyle
      color={color}
    >
      <div className="child-component">
        { props.children }
      </div>
    </ContentStyle>
  );
}

export default Content;
