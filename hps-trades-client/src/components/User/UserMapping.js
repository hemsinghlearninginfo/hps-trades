import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import styles from './User.css';
import { iconConstants } from '../../_constants';

class UserMapping extends Component {

    constructor(props) {
        super(props);

        const user = this.props.authentication.user;
        if (user == null || user.token == null) {
            this.props.history.push('/');
        }

        this.state = {
            isAddNew: false,
            mappings: [],
            users: [],
            newMapping: {
                user: '',
                master: '',
            },
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getAllMapping();
        this.getAllUsers();
    }


    getAllMapping = () => {
        userActions.getAllUsermapping()
            .then((responseText) => {
                return responseText;
            })
            .then((response) => {
                // let mappings = response.map(function (event) {
                //     return ({
                //         id: event._id,
                //         heading: event.heading,
                //         message: event.message,
                //         fromDate: event.fromDate,
                //         toDate: event.toDate,
                //         dateForDisplay: `${moment(event.fromDate).format('Do MMM YYYY, HH:mm A')} - ${moment(event.toDate).format('Do MMM YY, HH:mm A')}`,
                //         eventType: event.eventType.name,
                //     })
                // });
                //this.setState({ mappings });
            });
    }

    getAllUsers = () => {
        userActions.getAllWithType()
            .then((responseText) => {
                return responseText;
            })
            .then((response) => {
                this.setState({ users: response });
            });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newMapping } = this.state;
        this.setState({
            newMapping: {
                ...newMapping,
                [name]: value
            }
        });
    }


    addNew = () => {
        this.setState({ isAddNew: !this.state.isAddNew });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isAddNew: !this.state.isAddNew });
        const { newMapping } = this.state;
        if (newMapping.user && newMapping.master) {
            
        }
    }

    render() {
        const { isAddNew, users, newMapping } = this.state;
        const selectMasterOptionsHTML = users.map((item) => {
            return (
                item.type == 'Master' && <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName}</option>
            )
        });

        const selectOptionsHTML = users.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName}</option>
            )
        });

        return (
            <Components.PageTemplate iconType={iconConstants.USER_MAPPING} heading="User Mapping">
                <div>
                    <table className="table table-bordered userMapping table-hover">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Master</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><button className="btn btn-sm btn-danger">Delete</button></td>
                                <td>Username</td>
                                <td>hemsingh81@gmail.com</td>
                            </tr>
                            {(isAddNew && <tr>
                                <td colSpan="3">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <table className="table">
                                            <tr>
                                                <td>Master</td>
                                                <td>
                                                    <select className="form-control required" name="master" value={newMapping.master} onChange={this.handleChange}>
                                                        <option>Select Master</option>
                                                        {selectMasterOptionsHTML}
                                                    </select>
                                                </td>
                                                <td>User</td>
                                                <td>
                                                    <select className="form-control required" name="user" value={newMapping.user} onChange={this.handleChange}>
                                                        <option>Select User</option>
                                                        {selectOptionsHTML}
                                                    </select>
                                                </td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-success" type="submit" onClick={this.handleSubmit}>Save</button>
                                                    {' '}
                                                    <button className="btn btn-sm btn-danger" type="button" onClick={this.addNew}>Cancel</button>
                                                </td>
                                            </tr>
                                        </table>
                                    </form>
                                </td>
                            </tr>)}
                        </tbody>
                        {(!isAddNew &&
                            <tfoot>
                                <tr>
                                    <td colSpan="3"><button className="btn btn-sm btn-success" onClick={this.addNew}>Add New</button></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
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

// const connectedUserMappingPage = connect(mapStateToProps)(CSSModules(UserMapping, styles));
// export { connectedUserMappingPage as UserMapping };

export default connect(mapStateToProps)(CSSModules(UserMapping, styles)); 
