import {JobAllocation} from './JobAllocation'
import {Contact} from './Contact'

export interface Job {
    id?: string
    name?: string
    contact?: Contact
    location?: string
    jobAllocations?: [JobAllocation]
    start: string
    end: string
}