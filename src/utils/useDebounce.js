import { useState, useEffect } from "react";

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

export default useDebounce;
