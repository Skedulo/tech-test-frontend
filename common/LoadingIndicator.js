import React from 'react'
import Loader from 'react-loader-spinner'
import { usePromiseTracker } from "react-promise-tracker"

export const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div className="waiting-indicator">
      <Loader type="ThreeDots" color="#007ee6" />
    </div>
  );    
}