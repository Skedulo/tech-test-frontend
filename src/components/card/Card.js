import React from "react";

import { displayTimeWithoutSec } from "../../utils/data-formatter";
import "./Card.scss";

function Card(props) {
  const { name, start, end, location, id, numOfAllocations } = props;
  return (
    <div className="card">
      <h3>{name}</h3>
      <div>
        {displayTimeWithoutSec(start)}-{displayTimeWithoutSec(end)}
        {location}
        {`(Job #${id})`}
        {numOfAllocations}
      </div>
    </div>
  );
}

export default Card;
