import React, { useCallback } from "react";
import styled from "@emotion/styled";
import LoadingStripe from "./LoadingStripe";
import TextInput from "../components/TextInput";

const ErrorText = styled.span(
  ({ theme }) => `
  color: ${theme.error.main};
  margin-bottom: ${theme.spacing.sm};
  min-height: ${theme.spacing.md};
`
);

// Source: magnifier by Ayub Irawan from the Noun Project
const SearchIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    height="24px"
    width="24px"
    viewBox="0 0 100 100"
    {...props}>
    <path d="M84.242,75.758l-15.23-15.23C72.157,55.784,74,50.105,74,44c0-16.542-13.458-30-30-30S14,27.458,14,44  s13.458,30,30,30c6.105,0,11.784-1.843,16.528-4.988l15.23,15.23c2.341,2.344,6.143,2.344,8.484,0  C86.586,81.9,86.586,78.1,84.242,75.758z M23,44c0-11.58,9.42-21,21-21s21,9.42,21,21s-9.42,21-21,21S23,55.58,23,44z" />
  </svg>
);

const SearchInputWrapper = styled.div(
  ({ theme }) => `
  margin-bottom: ${theme.spacing.sm};
`
);

const SearchInput = ({ value, onChange, isLoading, error, ...otherProps }) => {
  const onSearchChange = useCallback(e => onChange(e.target.value), [onChange]);
  return (
    <SearchInputWrapper>
      <TextInput
        label={<SearchIcon />}
        value={value}
        onChange={onSearchChange}
        error={error}
        {...otherProps}
      />
      <LoadingStripe isLoading={isLoading} />
      <ErrorText>{error}</ErrorText>
    </SearchInputWrapper>
  );
};

export default SearchInput;
