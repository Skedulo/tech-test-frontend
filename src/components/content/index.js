import React from "react"
import { ContentStyle } from "./style"

function Content(props) {
  const { color } = props;
  return (
    <ContentStyle
      color={color}
    >
      { props.left }
      { props.right }
    </ContentStyle>
  );
}

export default Content;
