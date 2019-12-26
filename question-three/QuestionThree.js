import React, { Component } from 'react'
import { JobCard } from "../components/job/JobCard"
import { RessourcesMock } from "../components/job/RessourcesMock"
import { LoadingIndicator } from '../common/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'

import './QuestionThree.css'

export class QuestionThree extends Component {
  constructor(props) {
    super(props)
    this.state = { jobs: [] }
  }

  render() {
    return (
      <div>
        <div className="outer">
          <div className="body-container">
            <div className="flex-container">
              <div className="flex-content">
                <div className="full-height">
                  <div className="side-bar">
                    <ul>
                      <li><a href="#"></a></li>
                      <li><a href="#"></a></li>
                      <li><a href="#"></a></li>
                      <li><a href="#"></a></li>
                    </ul>
                    <a class="special" href="#"></a>
                  </div>
                  <div className="main-content">
                    <div className="flex-container">
                      <div className="flex-header header-text">
                        Header
                      </div>
                      <div className="flex-content">
                        <div className="container full-height">
                          <div className="row full-height">
                            <div className="col-4 left-side full-height">
                              {this.state.jobs.map((job, idx) => (
                                <JobCard job={job} index={idx} key={job.id} />
                              ))}
                              <LoadingIndicator />
                            </div>
                            <div className="col-8 right-side full-height">
                              <RessourcesMock />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }

  componentDidMount() {
    trackPromise(
      this.props.service.getJobs().then(jobs => {
        this.setState({ jobs: jobs });
      }));
  }
}