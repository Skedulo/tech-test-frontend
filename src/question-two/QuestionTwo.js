import React, { Component } from "react";
import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import { processDataForSwimlanes } from "./utils/data";
import { Swimlane } from "../components/swimlane/Swimlane";

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date("2018-09-01T00:00:00Z");
const RANGE_END = new Date("2018-09-01T24:00:00Z");

// On the server you’ll find an endpoint called ‘/resources’ which has data on a couple of people.  These people were assigned a few Jobs and Activities (‘/jobs’ and ‘/activities’ endpoints respectively) during the day.  Each person's assignment for the day can be found via the ‘/jobAllocations’ and ‘/activityAllocations’ endpoints.  You should note that each job and activity may be assigned to multiple people.

const SWIMLANE_DATA = {
  start: RANGE_START.valueOf(),
  end: RANGE_END.valueOf()
};

export class QuestionTwo extends Component {
  constructor(props) {
    super(props);
    this.state = { lanes: [] };
  }

  async fetchData() {
    try {
      const { data: resources } = await this.props.service.getResources();
      const { data: jobs } = await this.props.service.getJobs();
      const { data: activities } = await this.props.service.getActivities();
      const {
        data: activityAllocations
      } = await this.props.service.getActivityAllocations();
      const {
        data: jobAllocations
      } = await this.props.service.getJobAllocations();

      const lanes = processDataForSwimlanes({
        resources,
        jobs,
        activities,
        activityAllocations,
        jobAllocations
      });
      this.setState({ lanes });
    } catch (err) {
      alert("Sorry, failed to fetch data.");
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          <Swimlane {...SWIMLANE_DATA} lanes={this.state.lanes} />
        </SectionPanel>
      </SectionGroup>
    );
  }
}
