import React from "react";
import { connect } from "react-redux";

import { DataService } from "../../../service/DataService";

export class JobFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      loading: false,
    };
  }

  async componentDidUpdate(prevProps) {
    const currentSearchTerm = this.props.search.searchTerm;
    if (prevProps.search.searchTerm !== currentSearchTerm) {
      let searchResult = [];
      if (currentSearchTerm.length >= 3) {
        this.setState({ loading: true });
        try {
          searchResult = await DataService.searchJobsByName(currentSearchTerm);
        } catch (e) {
          // alert('failed to fetch from axois client')
          searchResult = [];
        }
      } else {
        searchResult = [];
      }
      //delay display of loading for 300ms to make it more obvious
      setTimeout(() => this.setState({ searchResult, loading: false }), 300);
    }
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? "Loading..."
          : this.state.searchResult.map((res, index) => (
              <div index={index}>
                <div>{res.name}</div>
                <div>{res.start}</div>
                <div>{res.end}</div>
                <div>{res.contactName}</div>
              </div>
            ))}
      </div>
    );
  }
}

export default connect((state) => ({
  search: state.search,
}))(JobFeed);
