import React, { Component } from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionTwo.css";
import useLoadSwimelane from "./useLoadSwimelane";
import { Swimlane } from "../components/swimlane/Swimlane";

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date("2018-09-01T00:00:00Z");
const RANGE_END = new Date("2018-09-01T24:00:00Z");

export const QuestionTwo = ({ service }) => {

  let {swimelane, isLoading} = useLoadSwimelane(service);

  return (
    <SectionGroup>
      <SectionPanel>
        {isLoading ? 'loading' : <Swimlane lanes={swimelane} start={RANGE_START} end={RANGE_END} />}
      </SectionPanel>
    </SectionGroup>
  );
};
