import React, { Fragment, Component } from 'react';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { InputBase } from '../components/input/InputBase';
import { Jobs } from '../components/jobs/Job';
import { Loading } from '../components/loading/Loading';

import { debounce } from '../utils';

import './QuestionOne.css';

export class QuestionOne extends Component {
  state = {
    isLoading: false,
    valueSearch: '',
    jobSearched: [],
  };

  handleSearchJobs = e => {
    const valueSearch = e.target.value;

    if (!valueSearch) {
      this.setState({ jobSearched: [] });
    }

    if (valueSearch.length > 3) {
      this.searchJobs(valueSearch);
    }

    this.setState({ valueSearch });
  };

  searchJobs = debounce(async valueSearch => {
    const { service } = this.props;
    this.setState({ isLoading: true });

    const jobSearched = await service.getJobsWithSearchTerm(valueSearch);
    this.setState({ jobSearched, isLoading: false });
  }, 300);

  render() {
    const { isLoading, valueSearch, jobSearched } = this.state;

    return (
      <SectionGroup>
        <SectionPanel>
          <Fragment>
            <InputBase
              className="jobs__search"
              type="search"
              placeholder="Please enter name jobs to search..."
              value={valueSearch}
              onChange={this.handleSearchJobs}
            />

            {isLoading ? (
              <Loading />
            ) : jobSearched.length > 0 ? (
              <Jobs jobs={jobSearched} />
            ) : (
              'No Results!'
            )}
          </Fragment>
        </SectionPanel>
      </SectionGroup>
    );
  }
}
