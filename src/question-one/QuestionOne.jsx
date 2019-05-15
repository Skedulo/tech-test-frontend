import React, { useMemo, useRef, useState } from 'react';
import { from, of } from 'rxjs';
import { map, tap, debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ClipLoader } from 'react-spinners';

import useHtmlEventStream from '../hooks/useHtmlEventStream';
import useObservable from '../hooks/useObservable';
import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import JobCard from '../components/job-card/JobCard';

import './styles.css';

const MINIMUM_SEARCH_TERM = 3;
const KEYPRESS_DEBOUNCE_MILLIS = 400;

export const QuestionOne = React.memo(props => {
    const { service } = props;
    const [isLoading, setLoading] = useState(false);
    const matchingTerm = useRef(null);
    const unsuccessfulSearch = useRef(null);

    const [onChange, currentSearchTerm] = useOnChangeCallback();
    const results = useResultsFromSearchTerm(currentSearchTerm);

    return (
        <SectionGroup>
            <SectionPanel>
                <div className="form__group">
                    <label htmlFor="job-search">Search</label>
                    <input type="text"
                           name="job-search"
                           placeholder="Search for Jobs..."
                           onChange={onChange} />

                    <div className="spinner__container">
                        <ClipLoader
                            sizeUnit={"px"}
                            size={15}
                            color={'#007ee6'}
                            loading={isLoading}
                        />
                    </div>
                </div>

                {results.map(result => (<JobCard {...result} key={result.id} />))}

                {unsuccessfulSearch.current && (
                    <div className="job-search__results--empty">There are no jobs matching the selected criteria.</div>
                )}

            </SectionPanel>
            <SectionPanel>
                <h6>NOTES:</h6>
                <p>
                    In day-to-day practice I would use an autosuggest 3rd party component and plumb in the queries/results,
                    but it felt like you were looking to see how I might go about handling all the events.
                    I've provided the beginning steps on how I would go about it using RxJS.
                </p>
            </SectionPanel>
        </SectionGroup>
    );

    ////////////////////

    function useOnChangeCallback() {
        const initialValue = '';

        return useHtmlEventStream(initialValue, event$ =>
            event$.pipe(
                map(e => e.target.value),
                debounceTime(KEYPRESS_DEBOUNCE_MILLIS),
                filter(query => {
                    const queryExtendsUnsuccessfulMatch = unsuccessfulSearch != null && query.startsWith(unsuccessfulSearch.current);
                    const clearResults = query.length < MINIMUM_SEARCH_TERM && !(matchingTerm.current && matchingTerm.current.startsWith(query));
                    return (query.length === 0 || query.length >= MINIMUM_SEARCH_TERM || clearResults) && !queryExtendsUnsuccessfulMatch;
                }),
                distinctUntilChanged(),
            )
        );
    }

    function useResultsFromSearchTerm(searchTerm) {
        const results$ = useMemo(() =>
            of(searchTerm).pipe(
                switchMap(query => {
                    setLoading(true);
                    const promise = query.length >= MINIMUM_SEARCH_TERM
                        ? service.graphQL.getJobsWithSearchTerm(query)
                        : Promise.resolve([]);
                    promise.finally(() => setLoading(false));
                    return from(promise);
                }),
                tap(results => {
                    matchingTerm.current = results.length ? searchTerm : null;
                    unsuccessfulSearch.current = searchTerm.length >= MINIMUM_SEARCH_TERM && !results.length ? searchTerm : null;
                })
            ), [searchTerm, setLoading]);

        return useObservable(results$, [], [results$]);
    }
});


