import React from "react";
import { connect } from "react-redux";

import { DataService } from "../../../service/DataService";

export class JobFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
    };
  }

  async componentDidUpdate(prevProps) {
    const currentSearchTerm = this.props.search.searchTerm;
    if (prevProps.search.searchTerm !== currentSearchTerm) {
      let searchResult = [];
      if (currentSearchTerm.length >= 3) {
        try {
          searchResult = await DataService.searchJobsByName(currentSearchTerm);
        } catch (e) {
          // alert('failed to fetch from axois client')
          searchResult = [];
        }
      } else {
        searchResult = [];
      }
      this.setState({ searchResult });
    }
  }

  render() {
    return (
      <div>
        {this.state.searchResult.map((res, index) => (
          <div index={index}>
            <div>{res.name}</div>
            <div>{res.start}</div>
            <div>{res.end}</div>
            <div>{res.contactId}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect((state) => ({
  search: state.search,
}))(JobFeed);
