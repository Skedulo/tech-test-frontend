import React, { useMemo, useState } from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import Timeline from 'react-calendar-timeline/lib/lib/Timeline'
import moment from 'moment'
import 'moment-timezone';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import EventCard from '../components/event-card/EventCard';
import timelineItemRenderer from './TimelineItemRenderer';

import './styles.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */

moment.tz.setDefault("UTC");
const RANGE_START = moment('2018-09-01T00:00:00Z');
const RANGE_END = moment('2018-09-01T24:00:00Z');
const JOB_HIGHLIGHT = '#5F8F0C';
const ACTIVITY_HIGHLIGHT = '#986FAC';

export const QuestionTwo = React.memo(props => {
    const { service } = props;
    const [state, fetch] = useAsyncFn(async () => {
        const results = await service.rest.getDayPlan();
        return buildModel(results);
    }, [props]);

    useMemo(fetch, [props]);

    const [selectedItem, setSelectedItem] = useState(null);
    const options = getOptions();

    return (
        <SectionGroup>
            <SectionPanel>
                {state.loading && <div>Loading...</div>}
                {state.value &&
                <Timeline
                    groups={state.value.groups}
                    items={state.value.items}
                    {...options} />
                }
                {selectedItem && (
                    <EventCard {...selectedItem} />
                )}
            </SectionPanel>
            {!state.loading && (
                <SectionPanel>
                    <h6>NOTES:</h6>
                    <p>
                        Because I couldn't locate a timezone indicating where the jobs/activities were taking place I assumed
                        the date/times returned from the server indicated the timezone and set everything to UTC.
                    </p>
                </SectionPanel>
            )}
        </SectionGroup>
    );

    ////////////////////

    function buildModel(results) {
        const groups = results.map(resource => {
            return { id: resource.id, title: resource.name };
        });

        const items = results.flatMap(resource => {
            return resource.schedule.map(event => {
                return {
                    id: `${event.type}-${event.id}-${resource.id}`,
                    group: resource.id,
                    type: event.type,
                    title: event.name,
                    start_time: moment(event.start),
                    end_time: moment(event.end),
                    contact: event.contact,
                    selectedBgColor: '#FFC107',
                    bgColor: event.type === 'job' ? JOB_HIGHLIGHT : ACTIVITY_HIGHLIGHT,
                };
            });
        });

        return { groups, items };
    }

    function getOptions() {
        const options = {
            timeSteps: {
                second: 1,
                minute: 5,
                hour: 1,
                day: 1,
                month: 1,
                year: 1
            },
            canResize: false,
            canMove: false,
            defaultTimeStart: RANGE_START,
            defaultTimeEnd: RANGE_END,
            itemRenderer,
            onItemSelect,
        };

        return options;

        ////////////////////

        function itemRenderer(context) {
            const { item, itemContext } = context;
            if (selectedItem && selectedItem.id === item.id && !itemContext.selected) {
                setSelectedItem(null);
            }
            return timelineItemRenderer(context);
        }

        function onItemSelect(itemId) {
            const item = state.value.items.find(item => item.id === itemId);
            const resource = state.value.groups.find(group => group.id === item.group);
            setSelectedItem({ ...item, resource });
        }
    }
});
