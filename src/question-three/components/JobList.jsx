import React, {useState, useEffect} from 'react'
import JobCard from './JobCard';
import {from} from 'rxjs';

import './JobList.css';

const INITIAL_STATE = {
    jobs: [],
    isLoading: true
}

const useLoadJobs =  (searchFn) => {
    let [state, updateState] = useState(INITIAL_STATE);

    useEffect(() => {
        let subscription = from(searchFn())
            .subscribe((jobs) => {
                updateState({
                    jobs,
                    isLoading: false
                })
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [searchFn])

    return state;
}

export default ({service, className}) => {
    
  const {jobs, isLoading} = useLoadJobs(service.getJobsWithSearchTerm);

    return (
        <div className={`jobList ${className}`}>
            {jobs.map(job => (
                <JobCard job={job} key={job.id} />
            ))}
        </div>
    )
}