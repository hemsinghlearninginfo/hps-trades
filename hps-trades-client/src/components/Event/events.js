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
                type: 'select',
                heading: '',
                message: '',
            },
            isAdd: false
        };

        this.handleAddEventItem = this.handleAddEventItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteEventItem = this.handleDeleteEventItem.bind(this);

    }

    componentDidMount() {
        this.setState({ types: ['Select', 'Warning', 'News', 'Error', 'Maintenance'] });
    }

    handleChange(event) {
        const { newEvent } = this.state;
        if (event._isAMomentObject) {
            this.setState({
                newEvent: {
                    ...newEvent,
                    date: event._d.toLocaleString()
                }
            });
        }
        else {
            const { name, value } = event.target;
            this.setState({
                newEvent: {
                    ...newEvent,
                    [name]: value
                }
            });
        }
    }

    handleAddEventItem() {
        this.state.events.push(this.state.newEvent);
        this.setState(
            this.state
        );
        this.setState({
            isAdd: !this.state.isAdd
        })
    }

    handleDeleteEventItem(itemIndex) {
        this.setState({
            events: this.state.events.filter((_, i) => i !== itemIndex)
          });
    }

    addEmptyItem = () => {
        this.setState({
            isAdd: !this.state.isAdd,
            newEvent: {
                type: 'select',
                heading: '',
                message: '',
                date: moment()
            }
        });
    }

    render() {
        const { events, types, isAdd, newEvent, isValid } = this.state;

        const selectOptionsHTML = types.map((item) => {
            return (
                <option key={item} value={item}>{item}</option>
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
                                <a href="#" className="deleteIcon" title="Delete" onClick={this.handleDeleteEventItem.bind(this, index)}>{getIcon(iconConstants.DELETE)}</a>
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
                <td className="date"><Datetime name="date" value={newEvent.date} onChange={this.handleChange} dateFormat="DD-MM-YY" timeFormat="HH:mm" /></td>
                <td className="type"><select className="required" name="type" value={newEvent.type} onChange={this.handleChange}>{selectOptionsHTML}</select></td>
                <td className="heading"><input className="required" name="heading" type="text" value={newEvent.heading} onChange={this.handleChange} /></td>
                <td><input className="required" name="message" type="text" value={newEvent.message} onChange={this.handleChange} /></td>
                <td className="actions">
                    <a href="#" className="saveIcon" title="Save" onClick={this.handleAddEventItem}>{getIcon(iconConstants.SAVE)}</a>
                    <a href="#" className="cancelIcon" title="Cancel" onClick={this.addEmptyItem}>{getIcon(iconConstants.CANCEL)}</a>
                </td>
            </tr>
        )

        let errorHTML = (!isValid && <tr><td colSpan="5"><div className="errorBox">Error</div></td></tr>)

        return (
            <Components.PageTemplate iconType={iconConstants.Event} heading="Market Events">
                <table className="table table-sm table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="date">
                                {!isAdd && (<a href="#" className="addIcon" title="Add New Event" onClick={this.addEmptyItem} >{getIcon(iconConstants.ADD)}</a>)} Date
                                </th>
                            <th className="type">Type</th>
                            <th className="heading">Heading</th>
                            <th>Message</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {errorHTML}
                        {newItemHTML}
                        {eventItemsHTML}
                    </tbody>
                </table>
            </Components.PageTemplate>
        );
    }
}

export default CSSModules(Events, styles);
