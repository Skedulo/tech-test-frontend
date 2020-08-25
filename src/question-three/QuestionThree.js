import React from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import Header from "../components/header/Header";
import MenuBar from "../components/menu-bar/MenuBar";
import Card from "../components/card/Card";

import { DataService } from "../service/DataService";

import "./QuestionThree.scss";

export class QuestionThree extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
    };
  }

  async componentDidMount() {
    try {
      this.jobs = await DataService.getJobs();
      this.jobAllocations = await DataService.getJobAllocations();
    } catch (e) {
      alert("failed to fetch data from axois client");
    }
    this.integrateJobsAllocationIntoJobs();
  }

  integrateJobsAllocationIntoJobs() {
    const { jobAllocations, jobs } = this;
    jobs.forEach((job) => {
      job.numOfAllocations = 0;
      for (const jobAllocation of jobAllocations) {
        if (Number(job.id) === Number(jobAllocation.jobId)) {
          job.numOfAllocations++;
        }
      }
    });
    this.setState({ jobs });
  }

  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          <div className="board">
            <MenuBar />
            <div>
              <Header />
              <div className="board__content">
                <div className="board__content--left">
                  {this.state.jobs.map((job) => {
                    return <Card {...job} />;
                  })}
                </div>
                <div className="board__content--right"></div>
              </div>
            </div>
          </div>
        </SectionPanel>
      </SectionGroup>
    );
  }
}
