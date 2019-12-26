import React, { Component } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Swimlane } from '../components/swimlane/Swimlane'
import { LoadingIndicator } from '../common/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'
import { mergeWith, isArray } from 'lodash'

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export class QuestionTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hours: new Array(24).fill(''),
      event: {}
    };
  }

  render() {

    return (
      <SectionGroup>
        <SectionPanel>
          <div className="timeline">
            <div className="swimlane__title font-weight-bold">Timeline (h)</div>
            <div className="timeline-hours">
              {
                this.state.hours.map((hour, idx) => {
                  return <div className="timeline-hour" key={idx}>{idx}</div>
                })
              }
            </div>
          </div>
          {this.state.event.lanes &&
            <Swimlane start={this.state.event.start} end={this.state.event.end} lanes={this.state.event.lanes} />
          }
          <LoadingIndicator />
        </SectionPanel>
      </SectionGroup>
    )
  }

  buildAllocations(ressources, jobs, jobAllocations, activities, activityAllocations) {
    let jobEvents = ressources.map(res => {
      return {
        title: res.name,
        cards: jobAllocations
          .filter(x => x.resourceId + '' === res.id)
          .map(x => {
            let job = jobs.filter(j => j.id === x.jobId + '')[0];
            return {
              description: job.name,
              start: new Date(job.start),
              end: new Date(job.end)
            }
          })
      }
    });
    let activityEvents = ressources.map(res => {
      return {
        title: res.name,
        cards: activityAllocations
          .filter(x => x.resourceId + '' === res.id)
          .map(x => {
            let activity = activities.filter(j => j.id === x.activityId + '')[0];
            return {
              description: activity.name,
              start: new Date(activity.start),
              end: new Date(activity.end)
            }
          })
      }
    });
    return {
      start: RANGE_START,
      end: RANGE_END,
      lanes: mergeWith(jobEvents, activityEvents, (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      })
    }
  }
  componentDidMount() {
    trackPromise(
      Promise.all([
        this.props.service.getJobs(),
        this.props.service.getActivities(),
        this.props.service.getActivityAllocations(),
        this.props.service.getJobAllocations(),
        this.props.service.getResources()])
        .then(result => {
          let jobs = result[0];
          let activities = result[1];
          let activityAllocations = result[2];
          let jobAllocations = result[3];
          let resources = result[4];
          let event = this.buildAllocations(resources, jobs, jobAllocations, activities, activityAllocations);
          this.setState({ event: event });
        }))
  }
}