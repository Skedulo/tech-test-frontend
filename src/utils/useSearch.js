import useFetch from "./useFetch";
import useDebounce from "./useDebounce";

// T0DO: Extract and test this for edge cases
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

export default useSearch;
