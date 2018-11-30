import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';

import { eventActions } from '../../_actions';
import styles from './event.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import { dataManager } from '../../dataManager';
import 'react-datepicker/dist/react-datepicker.css';

class Events extends Component {

    constructor(props) {
        super(props);

        const user = this.props.authentication.user;
        if (user == null || user.token == null) {
            this.props.history.push('/');
        }

        this.state = {
            events: [],
            eventTypes: [],
            eventTypeDescription: '',
            fromDate: moment().fromNow(),
            toDate: moment().fromNow(),
            newEvent: {
                id: '',
                eventType: 'select',
                heading: '',
                message: '',
                fromDate: moment().fromNow(),
                toDate: moment().fromNow(),
                dateForDisplay: ''
            },
            isAdd: false,
            isValidDateRange: true,
            isLoaded: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteEventItem = this.handleDeleteEventItem.bind(this);
    }

    componentDidMount() {
        this.handleDBOperation('getListForEventTypes');
        this.handleDBOperation('getEventList');
    }

    handleChange(event, ctrl = "") {
        const { newEvent } = this.state;
        if (event != null) {
            if (event._isAMomentObject !== null && event._isAMomentObject && ctrl !== "") {
                this.setState({
                    newEvent: {
                        ...newEvent,
                        [ctrl]: moment(event._d)
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

                if (event.target.name === "eventType") {
                    let eventTypeDescription = this.state.eventTypes.filter(function (f) {
                        return f.id === value
                    })
                        .map(function (obj) {
                            return obj.description;
                        });
                    this.setState({
                        eventTypeDescription
                    })
                }
            }
        }
        else if (ctrl != null) {
            this.setState({
                newEvent: {
                    ...newEvent,
                    [ctrl]: ''
                }
            });
        }


    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });

        const { newEvent } = this.state;
        if (newEvent.fromDate && newEvent.toDate) {
            let isValidDateRange = (newEvent.fromDate < newEvent.toDate);
            this.setState({
                isValidDateRange
            });
        }

        if (newEvent.fromDate && newEvent.toDate
            && newEvent.eventType && newEvent.heading
            && newEvent.message
            && (newEvent.fromDate < newEvent.toDate)) {
            this.setState({
                isAdd: !this.state.isAdd
            })
            this.handleDBOperation('submit');
        }
    }

    editItem = (id) => {
        let foundItem = this.state.events.filter((obj) => obj.id === id)
        this.setState({
            isAdd: !this.state.isAdd,
            newEvent: {
                id: foundItem.id,
                type: 'select',
                heading: foundItem.id,
                message: foundItem.id,
                fromDate: moment(foundItem.fromDate),
                toDate: moment(foundItem.toDate),
                dateForDisplay: ''
            },
            eventTypeDescription: '',
            submitted: false
        });
    }

    handleDeleteEventItem(id) {
        this.setState({
            events: this.state.events.filter((obj) => obj.id !== id)
        });
        this.handleDBOperation('delete', id);
    }

    addEmptyItem = () => {
        this.setState({
            isAdd: !this.state.isAdd,
            newEvent: {
                id: '',
                type: 'select',
                heading: '',
                message: '',
                fromDate: moment(),
                toDate: moment(),
                dateForDisplay: ''
            },
            eventTypeDescription: '',
            submitted: false
        });
    }

    showModal = () => {
        this.refs.modal.getDOMNode().modal();
    }

    handleDBOperation = (dbTypeOperation, id = '') => {
        if (dbTypeOperation === 'submit') {
            let currentUser = dataManager.getCurrentUser();
            const { dispatch } = this.props;
            var newEvent = {
                ...this.state.newEvent,
                userId: currentUser._id,
                userRoleId: currentUser.userRole
            }
            dispatch(eventActions.createByUser(newEvent));
            this.handleDBOperation('getEventList');
        }
        else if (dbTypeOperation === 'delete') {
            const { dispatch } = this.props;
            dispatch(eventActions.deleteByUser(id));
        }
        else if (dbTypeOperation === 'getListForEventTypes') {
            eventActions.getEventTypesByUser()
                .then((responseText) => {
                    return responseText;
                })
                .then((response) => {
                    this.setState({ eventTypes: response });
                });
        }
        else if (dbTypeOperation === 'getEventList') {
            eventActions.getAllEventsByUser()
                .then((responseText) => {
                    return responseText;
                })
                .then((response) => {
                    let events = response.map(function (event) {
                        return ({
                            id: event._id,
                            heading: event.heading,
                            message: event.message,
                            fromDate: event.fromDate,
                            toDate: event.toDate,
                            dateForDisplay: `${moment(event.fromDate).format('Do MMM YYYY, HH:mm A')} - ${moment(event.toDate).format('Do MMM YY, HH:mm A')}`,
                            type: event.eventType.name,
                        })
                    });
                    this.setState({ events });
                });
        }
    }

    render() {
        const { events, eventTypes, eventTypeDescription, isAdd, newEvent, submitted, isValidDateRange } = this.state;
        const { requestLoading } = this.props;
        const selectOptionsHTML = eventTypes.map((item) => {
            return (
                <option key={item._id} value={item._id}>{item.name}</option>
            )
        });

        let eventItemsHTML = [];
        if (events.length > 0) {
            eventItemsHTML = events.map((item, index) => {
                return ((!item.isNew) &&
                    <div className="col-sm-6 col-md-4" key={index}>
                        <div className="card eventCards">
                            <div className="card-body">
                                <h5 className="card-title">{item.heading}</h5>
                                <p><strong>{item.dateForDisplay}</strong></p>
                                <p><strong>Type: {item.type}</strong></p>
                                <p className="card-text">{item.message}</p>
                                <a href="#" className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, item.id)}>{getIcon(iconConstants.EDIT)} Edit</a>
                                {' '}
                                <Components.ConfirmAlert buttonClassName="btn btn-sm btn-dange" buttonLabel="Delete" buttonIcon={getIcon(iconConstants.DELETE)}
                                    modalClassName=""
                                    title="Confirm" message="Are you sure to delete?" yesButtonLabel="Ok"
                                    yesButtonClick={this.handleDeleteEventItem.bind(this, item.id)} cancelButtonLabel="Cancel">
                                </Components.ConfirmAlert>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            eventItemsHTML = (
                <div className="col-sm-12 col-md-12">
                    <div className="noDataFound">
                        No event found
                    </div>
                </div>
            )
        }

        let newItemHTML = isAdd && (
            <div className="addBox">
                <div className="addBoxHeading">Add New Event Message</div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label"><strong>Date &amp; Time From</strong></label>
                                <label onClick={e => e.preventDefault()}>
                                    <DatePicker className="form-control"
                                        minDate={moment()}
                                        selected={newEvent.fromDate}
                                        onChange={(e) => this.handleChange(e, "fromDate")}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        dateFormat="DD-MM-YY HH:mm A"
                                        timeCaption="time"
                                        preventOpenOnFocus={true}
                                    />
                                </label>
                                {
                                    submitted && !newEvent.fromDate &&
                                    <div className="help-block">From Date &amp; Time is required</div>
                                }
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label"><strong>Date &amp; Time To</strong></label>
                                <label className="calCtrl" onClick={e => e.preventDefault()}>
                                    <DatePicker className="form-control"
                                        minDate={moment()}
                                        selected={newEvent.toDate}
                                        onChange={(e) => this.handleChange(e, "toDate")}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={1}
                                        dateFormat="DD-MM-YY HH:mm A"
                                        timeCaption="time"
                                        preventOpenOnFocus={true}
                                    />
                                </label>
                                {
                                    (submitted && !newEvent.toDate &&
                                        <div className="help-block">To Date &amp; Time is required</div>) ||
                                    (submitted && !isValidDateRange &&
                                        <div className="help-block">To Date &amp; Time should be greater than From Date &amp; Time.</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label"><strong>Type</strong></label>
                                <div className="col-xs-10">
                                    <select className="form-control required" name="eventType" value={newEvent.eventType} onChange={this.handleChange}>
                                        <option>Select Type</option>
                                        {selectOptionsHTML}
                                    </select>
                                    {
                                        submitted && (!newEvent.eventType || newEvent.eventType.toUpperCase() === "select".toUpperCase()) &&
                                        <div className="help-block">Message type is required</div>
                                    }
                                    <small className="form-text text-muted">{eventTypeDescription}</small>
                                </div>
                            </div></div>
                        <div className="col-md-3">
                            <div className="form-group form-group-sm">
                                <label className="control-label"><strong>Heading</strong></label>
                                <div className="col-xs-10">
                                    <input className="form-control required" name="heading" type="text" value={newEvent.heading} onChange={this.handleChange} />
                                    {
                                        submitted && !newEvent.heading &&
                                        <div className="help-block">Heading is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group-sm">
                        <label className="control-label col-xs-2"><strong>Message</strong></label>
                        <div className="col-xs-10">
                            <input className="form-control required" name="message" type="text" value={newEvent.message} onChange={this.handleChange} />
                            {
                                submitted && !newEvent.message &&
                                <div className="help-block">Message is required</div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-2 pull-right">
                            <button type="submit" className="btn btn-sm btn-primary" onClick={this.handleAddEventItem}>{getIcon(iconConstants.SAVE)} Save</button>
                            {' '}
                            <button type="button" className="btn btn-sm btn-warning" onClick={this.addEmptyItem}>{getIcon(iconConstants.CANCEL)} Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )

        return (
            <Components.PageTemplate iconType={iconConstants.EVENT} heading="Market Events">
                {requestLoading && (<Components.Loading message="loading" />)}
                {newItemHTML}
                {!isAdd && (
                    <a href="#" className="btn btn-info btn-sm" title="Add New Event" onClick={this.addEmptyItem} >{getIcon(iconConstants.ADD)} Add new event</a>
                )}
                <div className="row">
                    {eventItemsHTML}
                </div>
            </Components.PageTemplate>
        );
    }
}

function mapStateToProps(state) {
    const { requestLoading } = state.generic;
    const { authentication } = state;
    return {
        requestLoading,
        authentication
    };
}

const connectedEventsPage = connect(mapStateToProps)(CSSModules(Events, styles));
export { connectedEventsPage as Events }; 