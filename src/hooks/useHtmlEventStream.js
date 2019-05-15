import { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';

export default function useHtmlEventStream(initialValue, htmlEventStream) {
    const subjectRef$ = useRef(new Subject());
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        let stream$ = htmlEventStream(subjectRef$.current);
        const subscription = stream$.subscribe(setValue);
        return () => {
            subscription.unsubscribe();
            subjectRef$.current.complete()
        }
    }, []);

    // return the html event callback, and the current value
    return [val => subjectRef$.current.next(val), value]
}