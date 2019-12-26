import React, { Component } from 'react'

export class ListItem extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3">{this.props.job.name}</div>
                <div className="col-md-3">{new Date(this.props.job.start).toLocaleDateString()}</div>
                <div className="col-md-3">{new Date(this.props.job.end).toLocaleDateString()}</div>
                <div className="col-md-3">{this.props.job.contact.name}</div>
            </div>
        )
    }
}