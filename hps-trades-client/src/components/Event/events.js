import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import styles from './calendar.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
//import '../../assets/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';

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
                date: moment().fromNow(),
                dateForDisplay: ''
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
                    date: moment(event._d)
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
        this.state.newEvent.dateForDisplay = this.state.newEvent.date._d.toLocaleString();
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
                            <td className="date">{item.dateForDisplay}</td>
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
            eventItemsHTML = (<tr><td colSpan="5" className="noDataFound">No event found</td></tr>)
        }

        let newItemHTML = isAdd && (
            <div className="addBox">
                <div className="addBoxHeading">Add New Event Message</div>
                <form>
                    <div className="form-group">
                        <label className="control-label col-xs-2">Date</label>
                        <div className="col-xs-10">
                            <label onClick={e => e.preventDefault()}>
                                <DatePicker className="form-control"
                                    minDate={moment()}
                                    selected={newEvent.date}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={1}
                                    dateFormat="DD-MM-YY HH:mm A"
                                    timeCaption="time"
                                    preventOpenOnFocus={true}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-2">Type</label>
                        <div className="col-xs-10">
                            <select className="form-control required" name="type" value={newEvent.type} onChange={this.handleChange}>{selectOptionsHTML}</select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-2">Heading</label>
                        <div className="col-xs-10">
                            <input className="form-control required" name="heading" type="text" value={newEvent.heading} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-2">Message</label>
                        <div className="col-xs-10">
                            <input className="form-control required" name="message" type="text" value={newEvent.message} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-2 pull-right">
                            <button type="button" className="btn btn-sm btn-primary" onClick={this.handleAddEventItem}>{getIcon(iconConstants.SAVE)} Save</button>
                            &nbsp;
                        <button type="button" className="btn btn-sm btn-warning" onClick={this.addEmptyItem}>{getIcon(iconConstants.CANCEL)} Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )

        let errorHTML = (!isValid && <tr><td colSpan="5"><div className="errorBox">Error</div></td></tr>)

        return (
            <Components.PageTemplate iconType={iconConstants.Event} heading="Market Events">
                {newItemHTML}
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
                        {eventItemsHTML}
                    </tbody>
                </table>
            </Components.PageTemplate>
        );
    }
}

export default CSSModules(Events, styles);
