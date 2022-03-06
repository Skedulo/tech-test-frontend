import React from "react";
import './SearchField.css';
import { JobSearchQueryType } from "../../question-one/QuestionOne";

type SearchFieldType = {
  id: string,
  label: string,
  name: string,
}
type JobSearchQuerySubset = Pick<JobSearchQueryType, 'onClear' | 'onInputChange' | 'searchTerm'>
type ISearchField = JobSearchQuerySubset & SearchFieldType

export const SearchField: React.FC<ISearchField> = (props: ISearchField) => {
  const { id, label, name, searchTerm, onClear, onInputChange } = props
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input className="form-control" id={id} name={name} type="text" value={searchTerm} onChange={onInputChange} />
      <button data-testid="clear-button" className="clear-button" onClick={onClear}>Clear</button>
    </div>
  )
}


