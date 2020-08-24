import React from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import { DataService } from "../service/DataService";

import "./QuestionThree.css";

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
        <SectionPanel></SectionPanel>
      </SectionGroup>
    );
  }
}
