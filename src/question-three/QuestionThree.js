import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../components/header';
import LeftPanel from '../components/leftPanel';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { DataService } from '../service/DataService';

import './QuestionThree.css';
import { formatTime, formatTimeByHours } from '../utils';

const Styled = styled.div`
  padding-left: 50px;
  height: calc(100vh - 60px);
  position: relative;
  .header {
    position: absolute;
    left: 50px;
    top: 0;
    height: 70px;
    right: 0;
  }
`;

const MainStyled = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  left: 50px;
  bottom: 0;
  p {
    font-size: 16px;
    line-height: 19px;
    color: #8d8383;
    font-weight: 300;
  }
  .left-col {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    bottom: over;
    overflow-y: scroll;
    bottom: 0;
    max-height: calc(100vh - 130px);
    padding: 20px;
    background-color: #e3eef0;
    width: 360px;
  }
  .right-col {
    position: absolute;
    left: 360px;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    background-color: #fff;
    overflow-y: scroll;
  }
  .job-container .job-item {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    :last-child {
      margin-bottom: unset;
    }
    .job-top {
      margin-bottom: 15px;
    }
    .job-id {
      color: #8d8383;
      font-weight: 300;
    }
    .job-name {
      color: #283448;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
    }
    .job-time {
      font-weight: 500;
    }
  }
  .sub-item {
    background-color: #e3eef0;
    aspect-ratio: 16 / 2;
    margin-bottom: 20px;
    :last-child {
      margin-bottom: unset;
    }
  }
`;

const JobItem = React.memo((props) => {
  const { data } = props;
  const { id, name, location, start, end } = data;
  const date = formatTime(start, true);
  const timeStart = formatTimeByHours(start);
  const timeEnd = formatTimeByHours(end);
  return (
    <div className='job-item'>
      <div className='job-top'>
        <div className='hook'>
          <p className='job-name'>
            {name}
            <span className='job-id'>{`(Job #${id})`}</span>
          </p>
        </div>
        <p className='job-location'>{location}</p>
      </div>
      <div className='job-bot'>
        <p className='job-date'>{date}</p>
        <p className='job-time'>{`${timeStart}-${timeEnd}`}</p>
      </div>
    </div>
  );
});

JobItem.propTypes = {
  data: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    contactId: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
};

const JobsCol = React.memo((props) => {
  const [jobs, setJobs] = React.useState([]);
  const handleFetchJobs = async () => {
    try {
      let _jobs = await DataService.getJobs();
      setJobs([..._jobs]);
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    handleFetchJobs();
  }, []);
  return (
    <div className='job-container'>
      {jobs.map((job) => (
        <JobItem key={job.id} data={job} />
      ))}
    </div>
  );
});

const SubsCol = React.memo((props) => {
  return (
    <div className='sub-container'>
      {[...Array(10)].map((item) => (
        <div className='sub-item' key={item}></div>
      ))}
    </div>
  );
});

const Main = React.memo((props) => {
  return (
    <MainStyled className='main-container'>
      <div className='left-col'>
        <JobsCol />
      </div>
      <div className='right-col'>
        <SubsCol />
      </div>
    </MainStyled>
  );
});

export const QuestionThree = (props) => {
  return (
    <SectionGroup>
      <SectionPanel>
        <Styled>
          <Header />
          <LeftPanel />
          <Main />
        </Styled>
      </SectionPanel>
    </SectionGroup>
  );
};
