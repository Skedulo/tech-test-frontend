import React, { Component } from "react";
import styled from "@emotion/styled";
import { Heading } from "../components/Text";
import { JobListCard } from "../components/JobCard";

const SectionHeading = styled(Heading)(
  ({ theme }) => `
  color: ${theme.background.main};
  margin-bottom: 0;
  `
);

const Sidebar = styled.div(
  ({ theme }) => `
  width: ${theme.spacing.unit * 8}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.secondary.main};  
`
);

const IconPlaceholder = styled.div(
  ({ theme }) => `
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
  width: ${theme.spacing.unit * 6}px;
  height: ${theme.spacing.unit * 6}px;
  border-radius: ${theme.spacing.unit * 3}px;
  background-color: ${theme.secondary.contrast};
`
);

const IconGroup = styled.div(
  ({ theme }) => `
margin-top: ${theme.spacing.xs};
margin-bottom: ${theme.spacing.xs};
display: flex;
flex-direction: column;
justify-content: flex-start;
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

const ContentPanels = styled.div`
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

const PlacholderPanel = styled.div(
  ({ theme }) => `
    background-color: ${theme.background.surface};
    flex: 2.3;
    overflow-y: scroll;
    display: flex;
    flex-direction: column; 

`
);

const PlacholderContent = styled.div(
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

const JOBS = [
  {
    id: 0,
    name: "Build a fence",
    contactId: "0",
    start: "2018-09-01T10:00:00Z",
    end: "2018-09-01T11:00:00Z",
    location: "Brisbane"
  },
  {
    id: 1,
    name: "Build a shed",
    contactId: "1",
    start: "2018-09-01T10:15:00Z",
    end: "2018-09-01T11:00:00Z",
    location: "Brisbane"
  },
  {
    id: 2,
    name: "Shield some wiring",
    contactId: "0",
    start: "2018-09-01T09:00:00Z",
    end: "2018-09-01T13:00:00Z",
    location: "Brisbane"
  },
  {
    id: 3,
    name: "Pick up a trailer",
    contactId: "0",
    start: "2018-09-01T13:00:00Z",
    end: "2018-09-01T13:15:00Z",
    location: "Brisbane"
  }
];

export class QuestionThree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SectionGroup>
        <Sidebar>
          <IconGroup>
            <IconPlaceholder />
            <IconPlaceholder />
            <IconPlaceholder />
            <IconPlaceholder />
          </IconGroup>
          <IconGroup>
            <IconPlaceholder />
          </IconGroup>
        </Sidebar>
        <SectionPanel>
          <Header>
            <SectionHeading>Header</SectionHeading>
          </Header>
          <ContentPanels>
            <JobsPanel>
              {JOBS.map(j => (
                <JobListCard
                  key={j.id}
                  {...j}
                  cardDetail={"Brisbane"}
                  allocationCount={1}
                />
              ))}
            </JobsPanel>
            <PlacholderPanel>
              <PlacholderContent />
              <PlacholderContent />
              <PlacholderContent />
              <PlacholderContent />
            </PlacholderPanel>
          </ContentPanels>
        </SectionPanel>
      </SectionGroup>
    );
  }
}
