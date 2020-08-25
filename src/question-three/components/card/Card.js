import React from "react";

import {
  displayTimeWithoutSec,
  displayDate,
} from "../../../utils/date-formatter";
import "./Card.scss";

function Card(props) {
  const { name, start, end, location, id, numOfAllocations } = props;
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content--header">
          <h3>
            {name}
            <span>{`(Job #${id})`}</span>
          </h3>
          <span>{location}</span>
        </div>
        <div className="card__content--time">
          <div>{displayDate(start)}</div>
          <div>
            {displayTimeWithoutSec(start)}-{displayTimeWithoutSec(end)}
          </div>
        </div>
      </div>

      {numOfAllocations > 0 && (
        <div className="card__circle">
          <div className="card__circle--element">{numOfAllocations}</div>
        </div>
      )}
    </div>
  );
}

export default Card;
