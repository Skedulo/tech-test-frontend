import React from 'react'
import useReadInputStream from "../hooks/useReadInputStream";

export default ({value$, onChange}) => {
    let value = useReadInputStream(value$);

    return <input value={value} onChange={onChange} />
}