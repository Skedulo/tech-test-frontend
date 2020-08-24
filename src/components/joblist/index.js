import React from "react"
import { JobListStyle } from "./style"
import Card from "../common/Card"

function JobList(props) {
  const { color, jobs } = props;
  return (
    <JobListStyle
      color={color}
    >
      <div className="job-list">
      {
        jobs.map((job, index) => {
          return (
            <Card item={job} color={color}/>
          )
        })
      }
      </div>
    </JobListStyle>
  );
}

export default JobList;
