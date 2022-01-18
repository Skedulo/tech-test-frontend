import React from 'react'

export interface LoaderProps {
    visible?: boolean;
}
export function Loader({visible = true}: LoaderProps){
    return visible ? <div title='Loading' className='loader'></div> : null;
}