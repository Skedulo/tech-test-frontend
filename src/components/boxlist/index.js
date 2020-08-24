import React from "react"
import { BoxListStyle } from "./style"
import moment from 'moment'

function BoxList(props) {
  const { color, jobs } = props;
  return (
    <BoxListStyle
      color={color}
    >
      <div className="box-list">
      {
        jobs.map((job, index) => {
          return (
            <div 
              className={`box`}
              key={index}
              value={job.id}
            >
            </div>
          )
        })
      }
      </div>
    </BoxListStyle>
  );
}

export default BoxList;
