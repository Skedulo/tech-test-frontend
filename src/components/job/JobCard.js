import React, { Component } from 'react'
import moment from 'moment'
const TimeFormat = "HH:mm";

export class JobCard extends Component {
    render() {
        return (
            <div className="job-card p-2 d-flex flex-column mb-3">
              <div className="p-2">
                <div className="name"><span className="font-weight-bold">{this.props.job.name}</span> <span className="job-order">(Job #{this.props.index})</span></div>
                <div className="location mb-2 secondary-info">{this.props.job.location}</div>
                <div className="date secondary-info">{new Date(this.props.job.start).toDateString()}</div>
                <div className="time font-weight-bold secondary-info">{moment(this.props.job.start).format(TimeFormat)} - {moment(this.props.job.end).format(TimeFormat)}</div>
              </div>
            </div>
        )
    }
}