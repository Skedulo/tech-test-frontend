import {Job} from './Job'
import {Resource} from './Resource'

export interface JobAllocation {
    id?: string
    resource: Resource
    job: Job
}