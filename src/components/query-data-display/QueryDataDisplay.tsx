import React from 'react';
import { ErrorNotification } from "../error-notification/ErrorNotification";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

interface IQueryDataDisplay {
  children: React.ReactNode,
  errorMessage?: string,
  isLoading: boolean
}

export const QueryDataDisplay = (props: IQueryDataDisplay) => {
  const { children, errorMessage, isLoading } = props;
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {errorMessage && <ErrorNotification>{errorMessage}</ErrorNotification>}
      {children}
    </>
  )
}
