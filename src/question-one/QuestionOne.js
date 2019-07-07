import React, { useState } from "react";
import { JobCard } from "../components/Cards";
import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import SearchInput from "../components/SearchInput";
import { Subtitle } from "../components/Text";
import useSearch from "../utils/useSearch";

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
          <Subtitle data-testid="no-results">Sorry, no results...</Subtitle>
        )}
      </SectionPanel>
    </SectionGroup>
  );
};
