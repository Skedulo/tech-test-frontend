import React from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import { Swimlane } from "../components/swimlane/Swimlane";

import { DataService } from "../service/DataService";

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date("2018-09-01T00:00:00Z");
const RANGE_END = new Date("2018-09-01T24:00:00Z");

export class QuestionTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      lanes: [],
    };
  }

  async componentDidMount() {
    try {
      this.jobs = await DataService.getJobs();
      this.activities = await DataService.getActivities();
      this.resources = await DataService.getResources();
      this.jobAllocations = await DataService.getJobAllocations();
      this.activityAllocations = await DataService.getActivityAllocations();
    } catch (e) {
      alert("failed to fetch data from axois client");
    }
    this.integrateJobsIntoResources();
    this.integrateActivitiesIntoResources();
    this.generateLanes();
  }

  generateLanes = () => {
    const lanes = this.resources.map((resource) => {
      const cards = [];
      for (const jobInfo of resource.jobsInfo) {
        cards.push({
          start: new Date(jobInfo.start),
          end: new Date(jobInfo.end),
          description: jobInfo.name,
          style: { color: "red" },
        });
      }
      for (const activityInfo of resource.activitiesInfo) {
        cards.push({
          start: new Date(activityInfo.start),
          end: new Date(activityInfo.end),
          description: activityInfo.name,
          style: { color: "blue" },
        });
      }
      return { title: resource.name, cards };
    });
    this.setState({ lanes });
  };

  integrateJobsIntoResources() {
    const { resources, jobs, jobAllocations } = this;
    resources.forEach((resource) => {
      resource.jobsInfo = [];
      const resourceId = resource.id;
      for (const allocation of jobAllocations) {
        if (Number(allocation.resourceId) === Number(resourceId)) {
          resource.jobsInfo.push(jobs[allocation.jobId]);
        }
      }
    });
  }

  integrateActivitiesIntoResources() {
    const { resources, activities, activityAllocations } = this;
    resources.forEach((resource) => {
      resource.activitiesInfo = [];
      const resourceId = resource.id;
      for (const allocation of activityAllocations) {
        if (Number(allocation.resourceId) === Number(resourceId)) {
          resource.activitiesInfo.push(activities[allocation.activityId]);
        }
      }
    });
  }

  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          <Swimlane
            lanes={this.state.lanes}
            start={RANGE_START}
            end={RANGE_END}
          />
        </SectionPanel>
      </SectionGroup>
    );
  }
}
