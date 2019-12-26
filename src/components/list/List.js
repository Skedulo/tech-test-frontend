import React, { Component } from 'react';
import { SearchContext } from '../search/SearchContext';
import { ListItem } from './ListItem';

export class List extends Component {
    render() {
        return (
            <div>
                <SearchContext.Consumer>
                    {
                        (searchCtx) => (
                            searchCtx.state.query.length > 0 && 
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 col-sm-3 font-weight-bold">Job's name</div>
                                    <div className="col-md-3 col-sm-3 font-weight-bold">Start date</div>
                                    <div className="col-md-3 col-sm-3 font-weight-bold">End date</div>
                                    <div className="col-md-3 col-sm-3 font-weight-bold">Contact</div>
                                </div>
                                {searchCtx.state.results.map((item, idx) => (
                                    <ListItem job={item} key={idx}/>
                                ))}
                            </div>
                        )
                    }
                </SearchContext.Consumer>
            </div>
        )
    }
}