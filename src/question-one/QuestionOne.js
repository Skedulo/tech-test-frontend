import React, { Component } from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionOne.css";

const Input = ({ label, ...otherProps }) => (
  <label>
    {label}
    <input {...otherProps} />
  </label>
);

const formatDate = dateString => new Date(dateString).toLocaleString();

const SearchResult = ({ name, start, end, contactName }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <h2>{name}</h2>
    <span>{formatDate(start)}</span>
    <span>{formatDate(end)}</span>
    <span>{contactName}</span>
  </div>
);

const RESULTS = [
  {
    contactId: "0",
    end: "2018-09-01T11:00:00Z",
    id: 0,
    location: "Brisbane",
    name: "Build a fence",
    start: "2018-09-01T10:00:00Z"
  },
  {
    contactId: "1",
    end: "2018-09-01T11:00:00Z",
    id: 1,
    location: "Brisbane",
    name: "Build a shed",
    start: "2018-09-01T10:15:00Z"
  },
  {
    contactId: "0",
    end: "2018-09-01T13:00:00Z",
    id: 2,
    location: "Brisbane",
    name: "Shield some wiring",
    start: "2018-09-01T09:00:00Z"
  },
  {
    contactId: "0",
    end: "2018-09-01T13:15:00Z",
    id: 3,
    location: "Brisbane",
    name: "Pick up a trailer",
    start: "2018-09-01T13:00:00Z"
  }
];

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export class QuestionOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      isFetching: false,
      results: []
    };
  }

  pendingSearches = [];

  handleChange = e => {
    const search = e.target.value;
    this.setState({
      isFetching: false
    });
    this.debouncedUpdateSearch(search);
  };

  debouncedUpdateSearch = debounce(search => {
    this.setState(() => ({
      search
    }));
  }, 1000);

  fetchSearchResults = async () => {
    this.setState(
      () => ({ isFetching: true }),
      async () => {
        try {
          const results = await this.props.service.getJobsWithSearchTerm(
            this.state.search
          );
          if (this.state.isFetching) {
            this.setState({ results, isFetching: false });
          }
        } catch (err) {
          alert("Sorry, your search failed.");
          this.setState({ isFetching: false });
        }
      }
    );
  };

  clearSearchResults = () => {
    this.setState({ results: [] });
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.search === this.state.search) {
      return;
    }
    if (this.state.search === "") {
      this.clearSearchResults();
      return;
    }
    if (this.state.search.length > 2) {
      this.fetchSearchResults();
      return;
    }
  }

  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          <Input label="Job Search" onChange={this.handleChange} />
          {this.state.isFetching && (
            <span>Fetching... {this.state.search}</span>
          )}
          {this.state.results.map(({ name, start, end, contact }) => (
            <SearchResult
              name={name}
              start={start}
              end={end}
              contactName={contact.name}
            />
          ))}
        </SectionPanel>
      </SectionGroup>
    );
  }
}
