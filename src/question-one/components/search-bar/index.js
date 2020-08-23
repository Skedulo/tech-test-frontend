import React from "react";
import { connect } from "react-redux";
import { setSearchTerm } from "../../redux/action";
function SearchBar(props) {
  return (
    <div>
      <input
        onChange={(e) => {
          props.setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}

export default connect(() => ({}), { setSearchTerm })(SearchBar);
