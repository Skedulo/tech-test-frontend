import React from "react";
import "./Card.scss";

function Card(props) {
  const { name } = props;
  return (
    <div className="card">
      <h3>{name}</h3>
    </div>
  );
}

export default Card;
