import { QuestionOne } from "./QuestionOne";
import { render, fireEvent, wait } from "../test-utils";
import React from "react";

const JOBS = [
  {
    id: "0",
    name: "Build a fence",
    start: "2018-09-01T10:00:00Z",
    end: "2018-09-01T11:00:00Z",
    contact: {
      id: "0",
      name: "John Smith",
      __typename: "Contact"
    },
    __typename: "Job"
  },
  {
    id: "1",
    name: "Build a shed",
    start: "2018-09-01T10:15:00Z",
    end: "2018-09-01T11:00:00Z",
    contact: {
      id: "1",
      name: "Jane Smith",
      __typename: "Contact"
    },
    __typename: "Job"
  }
];

const service = {
  getJobsWithSearchTerm: jest.fn(
    () =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve(JOBS);
        }, 50)
      )
  )
};

const renderQuestion = () => {
  const rtl = render(<QuestionOne service={service} />);
  const searchInput = rtl.getByLabelText("search");
  return {
    ...rtl,
    searchInput
  };
};

const delay = (delayTime = 0) =>
  new Promise(resolve => setTimeout(resolve, delayTime));

test("starts with no results", () => {
  const { queryByTestId } = renderQuestion();
  expect(queryByTestId("no-results")).toBeInTheDocument();
});

test("searches when inputting 3 or more characters", async () => {
  const { getByText, queryByText, searchInput } = renderQuestion();
  fireEvent.change(searchInput, { target: { value: "Bu" } });
  expect(queryByText(/build a shed/i)).not.toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: "Bui" } });
  await wait(() => expect(getByText(/build a shed/i)).toBeInTheDocument());
});

test("debounces text input", async () => {
  const { getByText, queryByText, searchInput } = renderQuestion();
  fireEvent.change(searchInput, { target: { value: "Bui" } });
  await delay(50);
  expect(queryByText(/build a shed/i)).not.toBeInTheDocument();
  await wait(() => expect(getByText(/build a shed/i)).toBeInTheDocument());
});

test("shows a loading indicator while searching", async () => {
  const { getByTestId, searchInput } = renderQuestion();
  await wait(() => getByTestId("loading-strip-is-done"));
  fireEvent.change(searchInput, { target: { value: "Buil" } });
  await wait(() => getByTestId("loading-strip-is-loading"));
  await wait(() => getByTestId("loading-strip-is-done"));
});

test("shows job information", async () => {
  const { getByText, searchInput } = renderQuestion();
  fireEvent.change(searchInput, { target: { value: "Buil" } });
  const A_JOB = JOBS[0];
  await wait(() => getByText(A_JOB.name));
  getByText(A_JOB.contact.name);
});

test("clears results when input is cleared", async () => {
  const {
    getByText,
    queryByTestId,
    getByTestId,
    searchInput
  } = renderQuestion();
  fireEvent.change(searchInput, { target: { value: "Buil" } });
  const A_JOB = JOBS[0];
  await wait(() => getByText(A_JOB.name));

  fireEvent.change(searchInput, { target: { value: "Buil" } });
  expect(queryByTestId("no-results")).not.toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: "" } });
  await wait(() => getByTestId("no-results"));
});
