import React, { useRef, useState, useEffect } from 'react'

import './RightHandSide.css'

type RightHandSideProps = {
  className: string;
}

const ADD_ITEM_EACH_FAKE_LOAD = 10

const useFakeInfiniteLoad = (triggerRef: React.RefObject<HTMLDivElement>) => {
  const [fakeChildList, updateFakeChildList] = useState<{}[]>([])

  useEffect(() => {
    if (triggerRef.current) {
      let dom = triggerRef.current
      const options = {
        threshold: 1.0
      }
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateFakeChildList((current) => [...current, ...Array(ADD_ITEM_EACH_FAKE_LOAD)])
          }
        })
      }

      const observer = new IntersectionObserver(callback, options)

      observer.observe(dom)
      return () => {
        observer.unobserve(dom)
      }
    }
  }, [triggerRef])

  return fakeChildList
}

const RightHandSide : React.FC<RightHandSideProps>= ({ className }) => {
  const triggerRef = useRef<HTMLDivElement>(null)

  const fakeChildList = useFakeInfiniteLoad(triggerRef)
  return (
    <div className={`rightHandSide ${className}`}>
      {
        fakeChildList.map((ignore, index) => (
          <div key={index} className="rightHandSide__fakeChild"/>
        ))
      }
      <div className="rightHandSide__trigger" ref={triggerRef}>Trigger</div>
    </div>
  )
}

export default RightHandSide
 