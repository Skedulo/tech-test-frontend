import React from "react";
import PropTypes from 'prop-types';
import { CardStyle } from "./style";
import moment from 'moment'

const Card = props => {
  const {
    item,
    color
  } = props;
  return (
    <CardStyle
      key={item.id}
      value={item.id}
      color={color}
    >
      <div className="card-header">
        <span className="card-header-title">
          {item.name}
        </span>
        <span className="card-header-desc">
          {`(Job #${item.id})`}
        </span>
      </div>
      <div className="card-sub-header">
        Brisbane
      </div>
      <div className="card-footer">
        <span className="card-footer-desc">{moment(item.start).format("MMM DD YYYY")}</span>
        <span className="card-footer-title">
        {`${moment(item.start).format("hh:mm")} - ${moment(item.end).format("hh:mm")}`}
        </span>
      </div>
      { item.allocationCount > 0 &&
      ( 
        <div className="card-counter">
          <span>{item.allocationCount}</span>
        </div>
      )
      }
    </CardStyle>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  theme: PropTypes.object,
  touched: PropTypes.bool,
  active: PropTypes.bool
}

Card.defaultProps = {
  name: '',
  required: false,
  label: '',
  error: '',
  theme: {},
  touched: false,
  active: false
}

export default Card;