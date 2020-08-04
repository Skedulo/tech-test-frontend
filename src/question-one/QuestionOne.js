import React from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import SearchableSelectField from './SearchableSelectField'
import colors from '../style/colors'

import './QuestionOne.css'

export const QuestionOne = (props) => {
  const currencies = [
    {
      id: '1',
      name: 'USD',
    },
    {
      id: '2',
      name: 'EUR',
    },
    {
      id: '3',
      name: 'BTC',
    },
    {
      id: '4',
      name: 'JPY',
    }
  ];
  
  const form = {
    errors: {
      required: '',
      disabled: '',
      error: 'Incorrect entry.',
      number: '',
      withIcon: '',
    },
    touched: {
      required: true,
      disabled: false,
      error: true,
      number: true,
      withIcon: true,
    }
  }
  
  const fields = {
    required: {
      name: 'required',
      value: '1',
      required: true
    },
    disabled: {
      name: 'disabled',
      value: '2',
      required: false
    },
    error: {
      name: 'error',
      value: '3',
      required: false
    }
  }

  return (
    <SectionGroup>
      <SectionPanel>
        <div style={{padding: '30px', textAlign: 'center'}}>
          Please refer to INSTRUCTIONS.md
          <hr style={{width: '200px'}}/>
          <SearchableSelectField
            label="Required"
            field={fields.required}
            options={currencies}
            theme={colors.light}
            form={form}
        />
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}