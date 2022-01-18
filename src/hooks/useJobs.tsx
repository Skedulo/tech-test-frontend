import { useState } from "react"
import { Contact, IDataService, Job } from "../common/types";

type useJobsParams = {
    name: string
}

const test = () => Promise.reject('failed');

export default function useJobs({ name }: useJobsParams, service: IDataService) {
    const [jobList, setJobList] = useState<(Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[]>([]);
    const [isLoading, setLoading] = useState(false);

    const getJobsWithSearchTerm = async (name = '') => {
        try {
            setLoading(true);
            const jobs = await test();
            setJobList(jobs)
        } catch (error) {
            setJobList([]);
        } finally{
            setLoading(false);
        }

    }
    return { isLoading, jobs: jobList, getJobsWithSearchTerm };
}