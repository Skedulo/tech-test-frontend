import React, { useRef, useState, useEffect } from 'react'

import './RightHandSide.css';

const ADD_ITEM_EACH_FAKE_LOAD = 10

let useFakeInfiniteLoad = (triggerRef) => {
    let [fakeChildList, updateFakeChildList] = useState([]);

    useEffect(() => {
        let options = {
            root: null,
            threshold: 1.0
        }
        let callback = (entries) => { 
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateFakeChildList((current) => [...current, ...Array(ADD_ITEM_EACH_FAKE_LOAD)])
                }
            })
          };

        let observer = new IntersectionObserver(callback, options);

        observer.observe(triggerRef.current);
        return () => {
            observer.unobserve(triggerRef.current);
        }
    }, [])

    return fakeChildList
}

export default ({ className }) => {
    let triggerRef = useRef();

    let fakeChildList = useFakeInfiniteLoad(triggerRef);
    return (
        <div className={`rightHandSide ${className}`}>
            {
                fakeChildList.map((itemm, index) => (
                    <div key={index} className="rightHandSide__fakeChild"/>
                ))
            }
            <div className="rightHandSide__trigger" ref={triggerRef}>Trigger</div>
        </div>
    )
}