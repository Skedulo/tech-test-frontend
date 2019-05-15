import { useState, useEffect } from 'react';

export default function useObservable(observable, defaultValue, dependencies) {
    const [value, setValue] = useState(defaultValue);

    useEffect(
        () => {
            const subscription = observable.subscribe(setValue);
            return () => subscription.unsubscribe();
        },
        [observable, ...dependencies]
    );

    return value;
}