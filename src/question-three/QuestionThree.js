import React, { Component } from 'react';

import { Jobs } from '../components/jobs/Job';
import { Header } from '../components/header/Header';

import './QuestionThree.css';

export class QuestionThree extends Component {
  state = {
    isLoading: true,
    jobs: [],
    heightHeader: 0,
    mockupList: new Array(12).fill(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ),
  };

  headerRef = null;

  componentDidMount() {
    this.fetchJobs();

    if (this.headerRef) {
      this.setState({ heightHeader: this.headerRef.clientHeight });
    }
  }

  async fetchJobs() {
    const jobs = await this.props.service.getJobs();
    const jobAllocations = await this.props.service.getJobAllocations();
    const result = jobs.map(job => {
      const jobWithAllocation = jobAllocations.filter(
        allocation => allocation.job.id === job.id,
      );
      return {
        ...job,
        resourceNumber: jobWithAllocation.length,
      };
    });

    this.setState({ jobs: result, isLoading: false });
  }

  render() {
    const { isLoading, jobs, mockupList, heightHeader } = this.state;

    const styleHeader = {
      height: `calc(100% - ${heightHeader}px)`,
    };

    return (
      <div className="container">
        <div className="sidebar">
          <ul className="sidebar__list">
            <li className="sidebar__item"></li>
            <li className="sidebar__item"></li>
            <li className="sidebar__item"></li>
            <li className="sidebar__item"></li>
          </ul>
          <ul className="sidebar__list">
            <li className="sidebar__item"></li>
          </ul>
        </div>
        <main className="main">
          <Header headerRef={el => (this.headerRef = el)}>Header</Header>

          <div className="body" style={styleHeader}>
            <section className="body__left">
              {isLoading ? (
                'Connecting...'
              ) : jobs.length > 0 ? (
                <Jobs className="body__left__jobs" jobs={jobs}></Jobs>
              ) : (
                'No Results!'
              )}
            </section>
            <section className="body__right">
              <ul className="body__right__boxs">
                {mockupList.map(text => (
                  <li className="body__right__box">{text}</li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
