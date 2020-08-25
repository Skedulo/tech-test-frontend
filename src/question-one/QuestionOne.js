import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import SearchBar from "./components/search-bar/SearchBar";
import JobFeed from "./components/job-feed/JobFeed";

export const QuestionOne = (props) => {
  return (
    <Provider store={store}>
      <SectionGroup>
        <SectionPanel>
          <SearchBar />
          <JobFeed />
        </SectionPanel>
      </SectionGroup>
    </Provider>
  );
};
