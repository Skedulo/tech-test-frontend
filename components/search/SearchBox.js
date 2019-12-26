import React, { Component } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from './SearchContext';

export class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange.bind(this);
    }
    render() {
        return (
            <SearchContext.Consumer>
                {(searchCtx) => (
                    <div className="mb-3 text-center">
                        <input type="text" className="form-control" placeholder="Search..."
                            onChange={this.handleChange.bind(this, searchCtx)} />
                    </div>
                )}
            </SearchContext.Consumer>
        )
    }

    debouncedSearch = debounce(function (query, searchContext) {
        searchContext.onQueryChanged(query);
    }, 500);

    handleChange(searchContext, e) {
        this.debouncedSearch(e.target.value, searchContext);
    }
}