import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './QuestionOne.css';
import withQuestionOne from './QuestionOne.enhance';
import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import InputText from '../components/core/InputText';
import LoadingIcon from '../components/core/Loading';
import { formatTime } from '../utils';

const Styled = styled.div`
  .item {
    margin-bottom: 30px;
  }
  .hook {
    margin-bottom: 15px;
  }
  .hook .label {
    flex-basis: 15%;
    font-weight: 300;
  }
  .hook .value {
  }
`;

const Hook = React.memo((props) => {
  const { label, value } = props;
  if (!value) {
    return null;
  }
  return (
    <div className='hook flex'>
      <p className='label'>{`${label}:`}</p>
      <p className='value'>{value}</p>
    </div>
  );
});

Hook.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Item = React.memo((props) => {
  const { data } = props;
  const {
    id,
    name,
    start,
    end,
    contact: { name: contactName },
  } = data;
  const hookFactories = [
    { label: 'ID', value: id },
    { label: 'Name', value: name },
    { label: 'Start', value: formatTime(start) },
    { label: 'End', value: formatTime(end) },
    { label: 'Contact', value: contactName },
  ];
  return (
    <div className='item'>
      {hookFactories.map((item) => (
        <Hook {...item} key={item.label} />
      ))}
    </div>
  );
});

Item.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const QuestionOne = withQuestionOne(
  React.memo((props) => {
    const { handleChangeText, data, loading } = props;
    return (
      <SectionGroup>
        <SectionPanel>Question 1</SectionPanel>
        <Styled>
          <InputText
            onChange={handleChangeText}
            placeholder={'Search something'}
          />
          <div className='results-container'>
            {loading && <LoadingIcon />}
            {data.map((item) => (
              <Item data={item} key={item.id} />
            ))}
          </div>
        </Styled>
      </SectionGroup>
    );
  })
);

QuestionOne.propTypes = {
  handleChangeText: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
