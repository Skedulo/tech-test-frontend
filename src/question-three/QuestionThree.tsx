import React, { useEffect, useState } from "react"
import { IAppTabContainer, Job } from "../common/types"
import { HeaderContent } from "./header-content/Header"
import { Spacer } from "../components/spacer/Spacer"
import { JobCard } from "./job-card/JobCard"

import "./QuestionThree.css"

const mockLongList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const mockSmallList = [1, 2]

export const QuestionThree: React.FC<IAppTabContainer> = (props) => {
  const { service } = props
  const [jobList, setJobList] = useState<Job[]>([])
  const [showSupplementaryText, setShowSupplementaryText] = useState<boolean>(false)
  const [showTabs, setShowTabs] = useState<boolean>(false)
  const [mockJobItems, setMockJobItems] = useState<number[]>(mockLongList)

  const toggleSupplementaryText = () => setShowSupplementaryText((oldValue) => !oldValue)
  const toggleTabs = () => setShowTabs((oldValue) => !oldValue)
  const showLessItems = () => setMockJobItems(mockSmallList)
  const showMoreItems = () => setMockJobItems(mockLongList)

  useEffect(() => {
    service.getJobs()
      .then((response: Job[]) => {
        setJobList(response)
      })
  }, [service])

  return (
    <>
      <div className="question-three__tabheader">
        <HeaderContent {...{ showTabs, showSupplementaryText }} />
      </div>
      <div className="question-three__content">
        <div className="question-three__job-list">
          {jobList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="question-three_job-details">
          {mockJobItems.map((index) => (
            <div key={index} className="question-three-job-details-item">
              <button onClick={toggleSupplementaryText}>Toggle Supplementary Text</button>
              <Spacer />
              <button onClick={toggleTabs}>Toggle Tab Display (Read only)</button>
              <Spacer />
              {mockJobItems === mockLongList && (
                <button onClick={showLessItems}>Show less items</button>
              )}
              {mockJobItems === mockSmallList && (
                <button onClick={showMoreItems}>Show more items</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
