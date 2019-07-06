import React from "react";
import styled from "@emotion/styled";
import { Heading } from "../components/Text";
import { JobListCard } from "../components/Cards";
import Sidebar from "../components/Sidebar";
import useFetch from "../utils/useFetch";

const SectionHeading = styled(Heading)(
  ({ theme }) => `
  color: ${theme.background.main};
  margin-bottom: 0;
  `
);

const SectionGroup = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Header = styled.div(
  ({ theme }) => `
  background-color: ${theme.primary.main};
  height: ${theme.spacing.unit * 12}px;
  display: flex;
  align-items: center;
  padding-left: ${theme.spacing.md};
  `
);

const SectionPanel = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const JobsPanel = styled.div(
  ({ theme }) => `
  background-color: ${theme.background.main};
  flex: 1;
  overflow-y: scroll;
  min-width: 250px;
  padding: ${theme.spacing.md};
  `
);

const PlacholderWrapper = styled.div(
  ({ theme }) => `
    background-color: ${theme.background.surface};
    flex: 2.3;
    overflow-y: scroll;
    display: flex;
    flex-direction: column; 
`
);

const PlacholderTile = styled.div(
  ({ theme }) => `
    min-height: 250px;
    margin-top: ${theme.spacing.md};
    margin-left: ${theme.spacing.md};
    margin-right: ${theme.spacing.md};
    background-color: ${theme.background.main};
    &:last-of-type {
      margin-bottom: ${theme.spacing.md};
    }
`
);

const PlaceholderPanel = () => (
  <PlacholderWrapper>
    <PlacholderTile />
    <PlacholderTile />
    <PlacholderTile />
    <PlacholderTile />
  </PlacholderWrapper>
);

export const QuestionThree = ({ service }) => {
  // eslint-disable-next-line no-unused-vars
  const [_isFetching, response, _error] = useFetch(
    service.getJobsAndAllocations
  );
  return (
    <SectionGroup>
      <Sidebar />
      <SectionPanel>
        <Header>
          <SectionHeading>Header</SectionHeading>
        </Header>
        <Content>
          <JobsPanel>
            {response &&
              response.map(j => (
                <JobListCard key={j.id} {...j} cardDetail={"Brisbane"} />
              ))}
          </JobsPanel>
          <PlaceholderPanel />
        </Content>
      </SectionPanel>
    </SectionGroup>
  );
};
