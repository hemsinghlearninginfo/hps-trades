import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import styles from './calendar.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Events extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            events: [],
            types: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    componentDidMount() {
        let types = [];
        types = ['warning', 'news', 'error', 'maintenance'];
        this.setState({ types });
    }

    addEmptyItem = () => {
        let newEvent = {
            isNew: true,
            date: moment(),
            type: 'error',
            heading: 'heading',
            message: 'this is my message'
        }
        let events = this.state.events;
        events.push(newEvent);

        this.setState({
            events
        });
    }

    render() {

        const selectOptionsHTML = this.state.types.map((item) => {
            return (
                <option key={item}>{item}</option>
            )
        });

        const events = this.state.events;
        let eventItemsHTML = [];
        if (events.length > 0) {
            eventItemsHTML = this.state.events.map((item, index) => {
                if (!item.isNew) {
                    return (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.type}</td>
                            <td>{item.heading}</td>
                            <td>{item.message}</td>
                            <td className="actions">
                                <a href="#" className="editIcon" title="Edit">{getIcon(iconConstants.EDIT)}</a>
                                <a href="#" className="deleteIcon" title="Delete">{getIcon(iconConstants.DELETE)}</a>
                            </td>
                        </tr>
                    )
                }
                else {
                    return (
                        <tr key={index}>
                            <td><DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="LLL"
                                timeCaption="time"
                            /></td>
                            <td><select>{selectOptionsHTML}</select></td>
                            <td><input type="text" /></td>
                            <td><input type="text" /></td>
                            <td className="actions">
                                <a href="#" className="saveIcon" title="Save">{getIcon(iconConstants.SAVE)}</a>
                                <a href="#" className="cancelIcon" title="Cancel">{getIcon(iconConstants.CANCEL)}</a>
                            </td>
                        </tr>
                    )
                }
            })
        }
        else {
            eventItemsHTML = (<tr><td colSpan="5" className="noDataFound">No event found</td></tr>)
        }
        return (
            <Components.PageTemplate iconType={iconConstants.Event} heading="Market Events">
                <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <a href="#" className="addIcon" title="Add New Event" onClick={this.addEmptyItem} >{getIcon(iconConstants.ADD)}</a> Date
                                </th>
                                <th>Type</th>
                                <th>Heading</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventItemsHTML}
                        </tbody>
                    </table>
                </div>
            </Components.PageTemplate>
        );
    }
}

export default CSSModules(Events, styles);
