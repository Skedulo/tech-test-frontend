import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './RightHandSide.css'

const ADD_ITEM_EACH_FAKE_LOAD = 10

const useFakeInfiniteLoad = (triggerRef) => {
  const [fakeChildList, updateFakeChildList] = useState([])

  useEffect(() => {
    const options = {
      threshold: 1.0
    }
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateFakeChildList((current) => [...current, ...Array(ADD_ITEM_EACH_FAKE_LOAD)])
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(triggerRef.current)
    return () => {
      observer.unobserve(triggerRef.current)
    }
  }, [])

  return fakeChildList
}

const RightHandSide = ({ className }) => {
  const triggerRef = useRef()

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

RightHandSide.propTypes = {
  className: PropTypes.string
}

export default RightHandSide
