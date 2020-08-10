import React, {useState, useEffect} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import SearchableSelectField from '../components/common/SearchableSelectField'
import colors from '../style/colors'

import './QuestionOne.css'

import {DataService} from "../service/DataService"

export const QuestionOne = (props) => {
  const [jobs, setJobs] =  useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    setJobs([]);
    setSearchTerm(value);
  }

  const form = {
    errors: {
      required: ''
    },
    touched: {
      required: true
    }
  }
  
  const fields = {
    required: {
      name: 'required',
      value: '1',
      required: false,
      onChange: handleSearch
    }
  }

  const searchJob = () => {
    if(searchTerm.length > 2) {
      setIsLoading(true);
      DataService.getJobsWithSearchTerm(searchTerm.trim())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    searchJob();
  }, [searchTerm]);

  return (
    <SectionGroup>
      <SectionPanel>
        <div style={{padding: '30px', textAlign: 'center'}}>
          Please refer to INSTRUCTIONS.md
          <hr style={{width: '200px'}}/>
          <SearchableSelectField
            label="Looking for your job?"
            placeholder="Try type something more than 2 characters"
            field={fields.required}
            options={jobs}
            theme={colors.light}
            form={form}
            isLoading={isLoading}
        />
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}