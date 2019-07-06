import { useState, useEffect } from "react";

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

export default useFetch;
