import React from "react";
import styled from "@emotion/styled";

const SidebarWrapper = styled.div(
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

const Sidebar = () => (
  <SidebarWrapper>
    <IconGroup>
      <IconPlaceholder />
      <IconPlaceholder />
      <IconPlaceholder />
      <IconPlaceholder />
    </IconGroup>
    <IconGroup>
      <IconPlaceholder />
    </IconGroup>
  </SidebarWrapper>
);

export default Sidebar;
