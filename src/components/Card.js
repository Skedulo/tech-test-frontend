import styled from "@emotion/styled";

const Card = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: ${theme.background.surface};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`
);

export default Card;
