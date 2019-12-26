import React, { Component } from 'react'

export class RessourcesMock extends Component {
    constructor(props) {
        super(props)
        this.state = { items: new Array(10).fill('') }
    }
    render() {
        return (
            this.state.items.map((item, idx) => (
                <div className="ressource-item p-2 d-flex flex-column mb-3" key={idx}></div>
            ))
        )
    }
}