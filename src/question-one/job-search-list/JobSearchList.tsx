import React from 'react';
import { JobSearchFields } from "../../common/types"
import { formatDateTime } from "../../common/formatDateTime"
import './JobSearchList.css'

interface IJobSearchList {
  searchResults: JobSearchFields[]
}

export const JobSearchList: React.FC<IJobSearchList> = (props: IJobSearchList) => {
  const { searchResults } = props;
  return (
    <div className="job-search-results-list">
      {searchResults?.length > 0 && (
        <div className="job-search-results-header">
          <div className="name-column">Name</div>
          <div className="start-date-column">Start Date</div>
          <div className="end-date-column">End Date</div>
          <div className="contact-name-column">Contact</div>
        </div>
      )}
      {(searchResults || []).map((result, index) => {
        return (
          <div key={index} className="job-search-results-body" data-testid="search-result-item">
            <div className="name-column" data-testid={`search-result-name-${index}`}>{result.name}</div>
            <div className="start-date-column" data-testid={`search-result-start-date-${index}`}>{formatDateTime(result.start)}</div>
            <div className="end-date-column" data-testid={`search-result-end-date-${index}`}>{formatDateTime(result.end)}</div>
            <div className="contact-name-column" data-testid={`search-result-contact-name-${index}`}>{result.contact.name}</div>
          </div>
        );
      })}
    </div>
  )
}
