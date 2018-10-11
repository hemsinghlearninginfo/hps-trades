import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import * as Datetime from 'react-datetime';
import moment from 'moment';

import styles from './calendar.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import '../../assets/css/react-datetime.css';



class Events extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            types: [],
            isValid: true,
            date: moment().fromNow(),
            newEvent: {
                type: '',
                heading: '',
                message: '',
            },
            isAdd: false
        };

        this.handleAddEventItem = this.handleAddEventItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleDeleteItem = this.handleDeleteItem.bind(this);

        //this.initialValue = this.initialValue.bind(this);

    }

    componentDidMount() {
        this.setState({ types: ['warning', 'news', 'error', 'maintenance'] });
        //initialValue();
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newEvent } = this.state;
        this.setState({
            newEvent: {
                ...newEvent,
                [name]: value
            }
        });
    }

    handleAddEventItem() {
        this.state.events.push(this.state.newEvent);
        this.setState(
            this.state
        );
        this.setState({
            isAdd : !this.state.isAdd
        })
    }


    initialValue = () => {
        let initialEvents = {
            date: moment().fromNow(),
            type: '',
            heading: '',
            message: ''
        }
        this.setState({ events: [...this.state.events, initialEvents] });
    }

    addEmptyItem = () => {
        this.setState({
            isAdd: !this.state.isAdd,
            newEvent : {
                heading:'',
                message:''
            }
        });
    }

    render() {
        //initialValue();
        const { events, types, isAdd, newEvent } = this.state;

        const selectOptionsHTML = types.map((item) => {
            return (
                <option key={item}>{item}</option>
            )
        });

        let eventItemsHTML = [];
        if (events.length > 0) {
            eventItemsHTML = events.map((item, index) => {
                if (!item.isNew) {
                    return (
                        <tr key={index}>
                            <td className="date">{item.date}</td>
                            <td className="type">{item.type}</td>
                            <td className="heading">{item.heading}</td>
                            <td>{item.message}</td>
                            <td className="actions">
                                <a href="#" className="editIcon" title="Edit">{getIcon(iconConstants.EDIT)}</a>
                                <a href="#" className="deleteIcon" title="Delete">{getIcon(iconConstants.DELETE)}</a>
                            </td>
                        </tr>
                    )
                }
            })
        }
        else {
            eventItemsHTML = !isAdd && (<tr><td colSpan="5" className="noDataFound">No event found</td></tr>)
        }

        let newItemHTML = isAdd && (
            <tr>
                <td className="date"><Datetime name="date" /></td>
                <td className="type"><select name="type">{selectOptionsHTML}</select></td>
                <td className="heading"><input name="heading" type="text" value={newEvent.heading} onChange={this.handleChange} /></td>
                <td><input name="message" type="text" value={newEvent.message} onChange={this.handleChange} /></td>
                <td className="actions">
                    <a href="#" className="saveIcon" title="Save" onClick={this.handleAddEventItem}>{getIcon(iconConstants.SAVE)}</a>
                    <a href="#" className="cancelIcon" title="Cancel">{getIcon(iconConstants.CANCEL)}</a>
                </td>
            </tr>
        )

        return (
            <Components.PageTemplate iconType={iconConstants.Event} heading="Market Events">
                {!this.state.isValid && <div className="errorBox">Error</div>}
                <table className="table table-sm table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="date">
                                <a href="#" className="addIcon" title="Add New Event" onClick={this.addEmptyItem} >{getIcon(iconConstants.ADD)}</a> Date
                                </th>
                            <th className="type">Type</th>
                            <th className="heading">Heading</th>
                            <th>Message</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newItemHTML}
                        {eventItemsHTML}
                    </tbody>
                </table>
            </Components.PageTemplate>
        );
    }
}

export default CSSModules(Events, styles);
