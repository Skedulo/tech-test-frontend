import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import SearchInput from "../components/SearchInput";
import { Subtitle } from "../components/Text";

const useDebounce = (value, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return [debouncedValue];
};

const useFetch = (asyncRequestFunc, arg) => {
  const [isFetching, setIsFetching] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);

  const shouldSkipFetch = arg === false;

  useEffect(() => {
    if (shouldSkipFetch) {
      setIsFetching(false);
      setResponse(undefined);
      setError(undefined);
      return;
    }

    setIsFetching(true);
    let tempResponse;
    let tempError;
    let wasAborted = false;
    async function fetch() {
      try {
        tempResponse = await asyncRequestFunc(arg);
      } catch (err) {
        tempError = err;
      }

      if (!wasAborted) {
        setIsFetching(false);
        setResponse(tempResponse);
        setError(tempError);
      }
    }
    fetch();
    return () => {
      wasAborted = true;
    };
  }, [arg, asyncRequestFunc, shouldSkipFetch]);

  return [isFetching, response, error];
};

// T0DO: Extract and the this for edge cases
const isStringOfAtLeast3Chars = str =>
  typeof str === "string" && str.length > 2;

const useSearch = (fetchSearchResultsFunc, search) => {
  const [debouncedSearch] = useDebounce(search);
  const shouldSearch = isStringOfAtLeast3Chars(debouncedSearch);
  const [isFetching, results, error] = useFetch(
    fetchSearchResultsFunc,
    shouldSearch && debouncedSearch
  );
  return [isFetching, results, error];
};

export const QuestionOne = props => {
  const [search, setSearch] = useState("");
  const [isFetching, results, error] = useSearch(
    props.service.getJobsWithSearchTerm,
    search
  );
  return (
    <SectionGroup>
      <SectionPanel>
        <SearchInput
          value={search}
          onChange={setSearch}
          isLoading={isFetching}
          error={error}
        />
        {results ? (
          results.map(({ id, name, start, end, contact }) => (
            <JobCard
              key={id}
              id={id}
              name={name}
              start={start}
              end={end}
              cardDetail={contact.name}
            />
          ))
        ) : (
          <Subtitle>Sorry, no results...</Subtitle>
        )}
      </SectionPanel>
    </SectionGroup>
  );
};
