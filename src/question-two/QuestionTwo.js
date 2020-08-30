import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import { Swimlane } from '../components/swimlane/Swimlane'

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export const QuestionTwo = (props) => {

    const [data, setData] = useState([]);
    useEffect(() => {
        function loadData() {
            let promises = [];
            promises.push(props.service.getResources());
            promises.push(props.service.getJobAllocations());
            promises.push(props.service.getJobs());
            promises.push(props.service.getActivityAllocations());
            promises.push(props.service.getActivities());

            return Promise.all(promises).then((responses) => {
                let [resources, job_allocations, jobs, activity_allocations, activities] = responses;
                let data_response =[];
                resources.map(resource => {
                    // get jobs
                    let jobs_data = [];
                    job_allocations.filter((job_allocation) => {
                        return job_allocation.resourceId == resource.id;
                    }).map((job_allocation) => {
                        let filtered_data = jobs.filter((job) => {
                            return job.id == job_allocation.jobId;
                        }).map(job => {
                            job.description = job.name;
                            job.className = 'job-card';
                            return job;
                        });

                        jobs_data = [...jobs_data, ...filtered_data];
                    })

                    // get activities
                    let activities_data = [];
                    activity_allocations.filter((activity_allocation) => {
                        return activity_allocation.resourceId == resource.id;
                    }).map((activity_allocation) => {
                        let filtered_data = activities.filter((activity) => {
                            return activity.id == activity_allocation.activityId;
                        }).map(activity => {
                            activity.description = activity.name;
                            activity.className = 'activity-card';
                            return activity;
                        });

                        activities_data = [...activities_data, ...filtered_data];
                    })

                    // Combine data
                    let data_object = {
                        title: resource.name,
                        cards: [...jobs_data, ...activities_data]
                    };
                    data_response.push(data_object);
                });

                setData(data_response);
            });
        }

        loadData();
    }, [])

    return (
        <SectionGroup>
            <SectionPanel>
                {Swimlane({lanes: data, start: RANGE_START, end: RANGE_END})}
            </SectionPanel>
        </SectionGroup>
    )
}