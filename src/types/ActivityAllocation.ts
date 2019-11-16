import {Activity} from './Activity'
import {Resource} from './Resource'

export interface ActivityAllocation {
    id?: string
    resource: Resource
    activity: Activity
  }