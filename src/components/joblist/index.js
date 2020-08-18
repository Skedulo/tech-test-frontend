import React from "react"
import { JobListStyle } from "./style"

function JobList(props) {
  const { color } = props;
  return (
    <JobListStyle
      color={color}
    >
      <div className="child-component">
        { props.children }
      </div>
    </JobListStyle>
  );
}

export default JobList;
