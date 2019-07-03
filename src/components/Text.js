import styled from "@emotion/styled";

export const Heading = styled.h1(
  ({ theme }) => `
  color: ${theme.background.contrast};
  margin: 0;
  margin-bottom: 10px;
  font-size: ${theme.fontSize.h1};
  font-weight: 300;  
`
);

export const Title = styled.h2(
  ({ theme }) => `
  color: ${theme.background.contrast};
  margin: 0;
  margin-bottom: 10px;
  font-size: ${theme.fontSize.h2};
  font-weight: 600;
`
);

export const Subtitle = styled.h3(
  ({ theme }) => `
  color: ${theme.background.contrastMedium};
  font-size: ${theme.fontSize.h3};
  font-weight: normal;
  margin: 0;
  margin-bottom: 10px;
`
);

export const Body = styled.p(
  ({ theme }) => `
  color: ${theme.background.contrast};
`
);

export const BodySpan = Body.withComponent("span");
