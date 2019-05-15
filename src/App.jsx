import React, { Component } from 'react';

import { DataService } from './service/DataService';
import { QuestionOne } from './question-one/QuestionOne';
import { QuestionTwo } from './question-two/QuestionTwo';

import cn from 'classnames';

import './App.css';

const AppTabs = {
    First: 'first',
    Second: 'second',
};

class App extends Component {
    constructor(props) {
        super(props);

        const defaultTab = localStorage.getItem('selectedTab') || AppTabs.First;
        this.state = {
            selectedTab: defaultTab
        }
    }

    render() {
        return (
            <div className="app__container">
                <header className="app__header">
                    <h1 className="app__title">Skedulo Technical Test</h1>
                    {this.renderTabs()}
                </header>
                <div className="app__content">
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    renderTabs = () => {
        const firstTabClasses = cn('app__tab', { 'app__tab--selected': this.state.selectedTab === AppTabs.First });
        const secondTabClasses = cn('app__tab', { 'app__tab--selected': this.state.selectedTab === AppTabs.Second });
        return (
            <div className="app__tab-group">
                <div
                    className={firstTabClasses}
                    onClick={() => this.setSelectedTab(AppTabs.First)
                    }>
                    First Question
                </div>
                <div
                    className={secondTabClasses}
                    onClick={() => this.setSelectedTab(AppTabs.Second)}>
                    Second Question
                </div>
            </div>
        );
    };

    renderContent = () => {
        switch (this.state.selectedTab) {
            case AppTabs.Second:
                return (<QuestionTwo service={DataService} />);
            case AppTabs.First:
            default:
                return (<QuestionOne service={DataService} />);
        }
    };

    setSelectedTab = (selectedTab) => {
        this.setState({ selectedTab }, () => localStorage.setItem('selectedTab', this.state.selectedTab))
    };
}

export default App;
