import styled from 'styled-components';

const JobListStyle = styled.div`
  width: 40%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${props => props.color.secondBg};
  .job-list {
    height: 100%;
    overflow-y: scroll;
  }
`;

export { JobListStyle };
