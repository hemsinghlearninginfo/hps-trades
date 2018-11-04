import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';

import { eventActions } from '../../_actions';
import styles from './calendar.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import { dataManager } from '../../_helpers'
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
            fromDate: moment().fromNow(),
            toDate: moment().fromNow(),
            newEvent: {
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
        eventActions.getEventTypesByUser()
            .then((responseText) => {
                return responseText;
            })
            .then((response) => {
                this.setState({ eventTypes: response });
            });
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
            && newEvent.message) {
            this.state.newEvent.dateForDisplay = `${this.state.newEvent.fromDate._d.toLocaleString()} - ${this.state.newEvent.toDate._d.toLocaleString()}`;
            // this.setState({
            //     newEvent: {
            //         dateForDisplay: `${this.state.newEvent.fromDate._d.toLocaleString()} - ${this.state.newEvent.toDate._d.toLocaleString()}`
            //     }
            // })
            this.state.events.push(this.state.newEvent);
            this.setState(
                this.state
            );
            this.setState({
                isAdd: !this.state.isAdd
            })

            const { dispatch } = this.props;
            dispatch(eventActions.create(this.state.newEvent));

        }
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
                fromDate: moment(),
                toDate: moment(),
                dateForDisplay: ''
            },
            submitted: false
        });
    }

    showModal = () => {
        this.refs.modal.getDOMNode().modal();
    }

    render() {
        const { events, eventTypes, isAdd, newEvent, submitted, isValidDateRange } = this.state;
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
                                <a href="#" className="btn btn-sm btn-warning" title="Edit">{getIcon(iconConstants.EDIT)} Edit</a>
                                {' '}
                                <Components.ConfirmAlert buttonClassName="btn btn-sm btn-dange" buttonLabel="Delete" buttonIcon={getIcon(iconConstants.DELETE)}
                                    modalClassName=""
                                    title="Confirm" message="Are you sure to delete?" yesButtonLabel="Ok"
                                    yesButtonClick={this.handleDeleteEventItem.bind(this, index)} cancelButtonLabel="Cancel">
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