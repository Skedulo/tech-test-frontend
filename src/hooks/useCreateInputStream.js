import { useMemo, useEffect, useCallback } from "react";
import { BehaviorSubject } from "rxjs";

const useCreateInputStream = () => {
  let value$ = useMemo(() => new BehaviorSubject(""), []);
  let onChange = useCallback(
    event => {
      value$.next(event.target.value);
    },
    [value$]
  );

  useEffect(
    () => () => {
      value$.complete();
    },
    [value$]
  );

  return [
    value$,
    onChange
  ];
};

export default useCreateInputStream;
