import React, { Component } from 'react';

import { getFormatDatetoMillisecond } from '../utils';
import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

import { Swimlane } from '../components/swimlane/Swimlane';

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

function formatAllocations(
  jobs,
  jobAllocations,
  activities,
  activityAllocations,
) {
  const jobAllocationsFormatted = jobAllocations.map(jobAllocation => {
    const getJobsWithId = jobs.find(job => job.id === jobAllocation.job.id);

    return {
      resourceId: jobAllocation.resource.id,
      description: getJobsWithId.name,
      start: getFormatDatetoMillisecond(getJobsWithId.start),
      end: getFormatDatetoMillisecond(getJobsWithId.end),
    };
  });

  const activityAllocationsFormatted = activityAllocations.map(
    activityAllocation => {
      const getActivitiesWithId = activities.find(
        activity => activity.id === activityAllocation.activity.id,
      );

      return {
        resourceId: activityAllocation.resource.id,
        description: getActivitiesWithId.name,
        start: getFormatDatetoMillisecond(getActivitiesWithId.start),
        end: getFormatDatetoMillisecond(getActivitiesWithId.end),
      };
    },
  );

  return [...jobAllocationsFormatted, ...activityAllocationsFormatted];
}

export class QuestionTwo extends Component {
  state = {
    isLoading: true,
    dataList: [],
    timelines: new Array(24).fill(''),
  };

  componentDidMount() {
    this.fetchJobsFullInfo();
  }

  async fetchJobsFullInfo() {
    const jobs = await this.props.service.getJobs();
    const activities = await this.props.service.getActivities();
    const resources = await this.props.service.getResources();
    const jobAllocations = await this.props.service.getJobAllocations();
    const activityAllocations = await this.props.service.getActivityAllocations();

    const allocations = formatAllocations(
      jobs,
      jobAllocations,
      activities,
      activityAllocations,
    );

    const result = resources.map(resource => {
      const result = allocations.filter(
        item => resource.id === item.resourceId,
      );

      return {
        title: resource.name,
        cards: result,
      };
    });

    this.setState({
      dataList: {
        start: RANGE_START.getTime(),
        end: RANGE_END.getTime(),
        lanes: result,
      },
      isLoading: false,
    });
  }

  render() {
    const { isLoading, dataList, timelines } = this.state;

    if (isLoading) {
      return 'Connecting...';
    }

    return (
      <SectionGroup>
        <SectionPanel>
          <div className="timeline">
            <div className="timeline__title">Hours</div>
            <div className="timeline__wrapper">
              {timelines.map((number, index) => (
                <div key={index} className="timeline__item">
                  {index}
                </div>
              ))}
            </div>
          </div>

          <Swimlane
            lanes={dataList.lanes}
            start={dataList.start}
            end={dataList.end}
          />
        </SectionPanel>
      </SectionGroup>
    );
  }
}
