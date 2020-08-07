import React,{useState, useEffect, useRef} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { AbPane, Header, LeftPane, RightPane } from '../components/task3'

import './QuestionThree.css'

export const QuestionThree = (props) => {
  const [jobAllocation, setJobsAllocation] = useState([]);
  const [oriData, setOriData] = useState([]);
  const elRef = useRef()
  const [elHeight, setelHeight] = useState();
  
  useEffect(() => {
    setelHeight(elRef.current.offsetHeight + props.appHeaderHeight)
  }, [elHeight, props.appHeaderHeight])
  useEffect(() => {
    const getJobs = async () => {
      const response = await props.service.getJobAllocationsDatas()
      const uniqueResponse = Array.from(new Set(response.map(a => a.jobId)))
      .map(jobId => {
        return response.find(a => a.jobId === jobId)
      })
      setJobsAllocation(uniqueResponse)
      setOriData(response)
    }
    getJobs();
  }, [props.service])
  
  const sampleArray = new Array(10).fill('')
  const ctnStyle = {height: (window.innerHeight - elHeight) + 'px'}
  const checkNumberOfAllocated = (id) => {
    let count = 0;
    oriData.forEach(ele =>{
      id === ele.jobId && count ++
    })
    return count
  }
  return (
    <SectionGroup>
      <SectionPanel>
        <div className="outer-container">
          <div className="cmp-header" ref={el => elRef.current = el}>
            <Header key={"header"}></Header>
          </div>
          <div className="cmp-ab-pane">
            <AbPane key={"abpane"}></AbPane>
          </div>
          <div className="inner-container" style={ctnStyle}>
            <div className="left-pane">
              <div className="left-pane__listing">
                {
                  jobAllocation?.map((item,index) => {
                    return (
                      <LeftPane
                        key={"leftpane"+ index}
                        id={item.jobId}
                        jobName={item.events.name}
                        startDay={new Date(item.events?.start)}
                        startTime={new Date(item.events?.start).toLocaleTimeString("en-GB", {
                          hour: '2-digit',
                          minute:'2-digit'
                        })}
                        endDay={new Date(item.events?.end)}
                        endTime={new Date(item.events?.end).toLocaleTimeString("en-GB", {
                          hour: '2-digit',
                          minute:'2-digit'
                        })}
                        contactAssigned={item.events?.contact[0].name}
                        numberResourceAllocated = {checkNumberOfAllocated(item.jobId)}
                      >
                      </LeftPane>
                    )
                  })
                }
              </div>
            </div>
            <div className="right-pane">
              {
                sampleArray?.map((item,index) => {
                  return (
                    <RightPane key={"rightpane"+ index}></RightPane>
                  )
                })
              }
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}