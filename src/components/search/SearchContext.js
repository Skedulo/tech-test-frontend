import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker'

export const SearchContext = React.createContext();

export class SearchContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = { query: "", results: [] }
    }
    render() {
        return (
            <SearchContext.Provider value={
                {
                    state: this.state,
                    onQueryChanged: (query) => {
                        if (query.length === 0 || query.length >= 3) {
                            this.setState({
                                query: query,
                                results: []
                            });
                        }
                        if (query.length >= 3) {
                            this.searchJobs(query);
                        }
                    }
                }}>
                {this.props.children}
            </SearchContext.Provider>
        )
    }
    searchJobs(query) {
        trackPromise(
            this.props.service.getJobsWithSearchTerm(query)
                .then(items => {
                    this.setState({
                        query: query,
                        results: items
                    });
                })
        );
    }
}