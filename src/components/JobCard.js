/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Card from "./Card";
import { Title, Subtitle, BodySpan } from "./Text";

// TODO: Use a library to format dates reliably
const formatDate = dateString => new Date(dateString).toDateString();
const formatTime = dateString => new Date(dateString).toLocaleTimeString();

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div(
  ({ theme }) => `
display: flex;
justify-content: flex-start;
align-items: baseline;
`
);

const CardTitle = styled(Title)(
  ({ theme }) => `
margin-right: ${theme.spacing.sm};
margin-bottom: 0;
`
);
const CardSubtitle = styled(Subtitle)(
  ({ theme }) => `
margin-bottom: 0;
flex-shrink: 0;
`
);

const CardDetail = styled(BodySpan)(
  ({ theme }) => `
  margin-bottom: ${theme.spacing.unit * 2}px;
  color: ${theme.background.contrastMedium};
`
);

const DateText = styled(BodySpan)(
  ({ theme }) => `
  color: ${theme.background.contrastMedium};
`
);

// TODO: Handle jobs that start and finish on different days
const JobDate = ({ start, end }) => {
  return (
    <FlexColumn>
      <DateText>{formatDate(start)}</DateText>
      <DateText>{`${formatTime(start)} - ${formatTime(end)}`}</DateText>
    </FlexColumn>
  );
};

const JobCard = ({ id, name, start, end, cardDetail, className }) => (
  <Card className={className}>
    <FlexColumn>
      <FlexRow>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>(JOB-{id})</CardSubtitle>
      </FlexRow>
      <CardDetail>{cardDetail}</CardDetail>
      <JobDate start={start} end={end} />
    </FlexColumn>
  </Card>
);

const ListCard = styled(Card)(
  ({ theme }) => `
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`
);

const CircleBadgeWrapper = styled.div(
  ({ theme }) => `
    box-sizing: border-box;
    height: ${theme.spacing.unit * 4.5}px;
    width: ${theme.spacing.unit * 4.5}px;
    border-radius: ${theme.spacing.unit * 2.25}px;
    border: 1px solid ${theme.primary.main};
    display: flex;
    justify-content: center;
    align-items: center;
`
);

const BadgeText = styled(BodySpan)(
  ({ theme }) => `
    color: ${theme.primary.main};
    font-weight: bold;
`
);

const CircleBadge = ({ text }) => (
  <CircleBadgeWrapper>
    <BadgeText>{text}</BadgeText>
  </CircleBadgeWrapper>
);

export const JobListCard = ({
  id,
  name,
  start,
  end,
  cardDetail,
  className,
  allocationCount
}) => (
  <ListCard className={className}>
    <FlexColumn>
      <FlexRow>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>(JOB-{id})</CardSubtitle>
      </FlexRow>
      <CardDetail>{cardDetail}</CardDetail>
      <FlexRow
        css={css({ justifyContent: "space-between", alignItems: "center" })}>
        <JobDate start={start} end={end} />
        {allocationCount > 0 && <CircleBadge text={allocationCount} />}
      </FlexRow>
    </FlexColumn>
  </ListCard>
);

export default JobCard;
