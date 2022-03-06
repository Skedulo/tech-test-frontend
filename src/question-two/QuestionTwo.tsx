import React, { useEffect, useState } from "react"
import { IAppTabContainer, JobAndActivityAllocations } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"
import { mapToUi } from "./DataMapper";

export interface ResourceSchedule {
  resourceName: string
  resourceId: number
  allocations: {
    allocType: 'job' | 'activity',
    name: string,
    start: string,
    end: string
  }[]
}

export const QuestionTwo: React.FC<IAppTabContainer> = (props) => {
  const { service } = props;
  const [resourceSchedule, setResourceSchedule] = useState<ResourceSchedule[] | null>(null);

  const { getJobAndActivityAllocations } = service

  useEffect(() => {
    getJobAndActivityAllocations()
      .then((response: JobAndActivityAllocations) => {
        const mappedResponse: ResourceSchedule[] | null = mapToUi(response)
        setResourceSchedule(mappedResponse)
      })
  }, [getJobAndActivityAllocations])

  const formattedResourceSchedule = JSON.stringify(resourceSchedule)

  return (
    <SectionGroup>
      <SectionPanel>
        {formattedResourceSchedule && (
          <code data-testid="code-block">
            {formattedResourceSchedule}
          </code>
        )}
      </SectionPanel>
    </SectionGroup>
  )
}
