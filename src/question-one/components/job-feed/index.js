import React from "react";
import { connect } from "react-redux";

function JobFeed(props) {
  return <div>{props.search.searchTerm}</div>;
}

export default connect((state) => ({
  search: state.search,
}))(JobFeed);
