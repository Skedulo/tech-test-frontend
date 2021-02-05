import React from 'react';
import styled from 'styled-components';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { Swimlane } from '../components/swimlane/Swimlane';
import { DataService } from '../service/DataService';

import './QuestionTwo.css';

const Styled = styled.div``;

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z');
const RANGE_END = new Date('2018-09-01T24:00:00Z');

const withQuestionTwo = (WrappedComp) => (props) => {
  const [lanes, setLanes] = React.useState([]);
  const handleFetchData = async () => {
    let swimLane = [];
    try {
      const [
        resources,
        jobs,
        jobAllocations,
        activities,
        activityAllocations,
      ] = await Promise.all([
        DataService.getResources(),
        DataService.getJobs(),
        DataService.getJobAllocations(),
        DataService.getActivities(),
        DataService.getActivityAllocations(),
      ]);
      resources.map((resource) => {
        const { id: resourceId, name } = resource;
        const jobAllocation = jobAllocations.find(
          (item) => item.resourceId == resourceId
        );
        const activityAllocation = activityAllocations.find(
          (item) => item.resourceId == resourceId
        );
        swimLane.push({
          title: name,
          cards: [
            ...(jobAllocation
              ? jobs
                  .filter((item) => item.id == jobAllocation.jobId)
                  .map((item) => ({
                    start: new Date(item.start).getTime(),
                    end: new Date(item.end).getTime(),
                    description: item.name,
                  }))
              : []),
            ...(activityAllocation
              ? activities
                  .filter((item) => item.id == activityAllocation.activityId)
                  .map((item) => ({
                    start: new Date(item.start).getTime(),
                    end: new Date(item.end).getTime(),
                    description: item.name,
                  }))
              : []),
          ],
        });
        return resource;
      });
    } catch (error) {
      throw error;
    } finally {
      setLanes([...swimLane]);
    }
  };
  React.useEffect(() => {
    handleFetchData();
  }, []);
  return <WrappedComp {...{ ...props, lanes }} />;
};

export const QuestionTwo = withQuestionTwo(
  React.memo((props) => {
    const { lanes } = props;
    console.debug(lanes);
    return (
      <SectionGroup>
        <SectionPanel>Please refer to INSTRUCTIONS.md</SectionPanel>
        <Styled>
          <Swimlane
            start={RANGE_START.getTime()}
            end={RANGE_END.getTime()}
            lanes={lanes}
          />
        </Styled>
      </SectionGroup>
    );
  })
);
