import React from "react";
import { connect } from "react-redux";

import { displayDateAndTime } from "../../../utils/date-formatter";
import { DataService } from "../../../service/DataService";

import "./JobFeed.scss";

export class JobFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      loading: false,
    };
  }

  async componentDidUpdate(prevProps) {
    try {
      this.jobs = await DataService.getJobs();
      this.contacts = await DataService.getContacts();
    } catch (e) {
      alert("failed to fetch data from axois client");
    }

    // integrate jobs and contacts JSON data to match requirement of display format
    this.jobs.forEach((job) => {
      job.contactName = this.contacts[job.contactId]
        ? this.contacts[job.contactId].name
        : "";
    });

    const searchTerm = this.props.search.searchTerm;
    if (prevProps.search.searchTerm !== searchTerm) {
      let searchResult = [];
      if (searchTerm.length >= 3) {
        this.setState({ loading: true });
        searchResult = this.searchJobsByName(searchTerm);
      } else {
        searchResult = [];
      }

      //delay display of loading for 300ms to make it more obvious
      setTimeout(() => this.setState({ searchResult, loading: false }), 300);
    }
  }

  searchJobsByName(searchTerm) {
    const searchResult = this.jobs.filter((job) =>
      //assume using case insensitive search
      job.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
    return searchResult;
  }

  render() {
    return (
      <div className="feed">
        {this.state.loading
          ? "Loading..."
          : this.state.searchResult.map((job, index) => (
              <div index={index} className="feed__row">
                <span>{job.name}</span>
                <span>
                  {`from ${displayDateAndTime(
                    job.start
                  )} to ${displayDateAndTime(job.end)} `}
                </span>
                <span>{job.contactName}</span>
              </div>
            ))}
      </div>
    );
  }
}

export default connect((state) => ({
  search: state.search,
}))(JobFeed);
