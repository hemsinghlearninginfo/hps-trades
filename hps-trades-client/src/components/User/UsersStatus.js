import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import moment from 'moment';

import Components from '../index';
import { userActions } from '../../_actions';
import styles from './User.css';
import { iconConstants } from '../../_constants';

class UsersStatus extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            users: [],
            filteredUsers: [],
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user == null || user.token == null) {
            this.props.history.push('/');
        }
        else {
            this.getAllUsers();
        }
    }

    getAllUsers = () => {
        userActions.getAll()
            .then((responseText) => {
                return responseText;
            })
            .then((response) => {
                this.setState({ users: response, filteredUsers: response });
            });
    }

    handleSearchChange() {
        let filterText = this.refs.filterTextInput.value;
        this.setState({ filterText });
        const { users, filteredUsers } = this.state;
        if (filterText !== '') {
            this.setState({ filteredUsers: this.state.users.filter(item => (item.username.indexOf(filterText) > -1 || item.firstName.indexOf(filterText) > -1 || item.lastName.indexOf(filterText) > -1)) });
        }
    }

    handleChange(event) {
        // const { name, value } = event.target;
        // const { newMapping } = this.state;
        // this.setState({
        //     newMapping: {
        //         ...newMapping,
        //         [name]: value
        //     }
        // });
    }

    render() {
        const { filteredUsers, filterText } = this.state;
        let userHTMLTable = filteredUsers.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.firstName + ' ' + item.lastName}</td>
                    <td>Admin</td>
                    <td>{item.isRegistrationActive ? 'Yes' : 'No'}</td>
                    <td>{moment(item.createdDate).format('DD-MMM-YYYY, hh:mm a')}</td>
                </tr>
            );
        });

        return (
            <Components.PageTemplate iconType={iconConstants.USERS_STATUS} heading="User Status">
                <div className="table-responsive">
                    <div><input type="text" className="form-control form-control-sm" placeholder="Search data by username, name and role..." value={filterText} ref="filterTextInput" onChange={this.handleSearchChange.bind(this)} /></div>
                    <table className="table table-hover bg-white border shadow table-bordered">
                        <thead>
                            <tr className="font-weight-bold bg-info text-light">
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Is Active</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userHTMLTable}
                        </tbody>
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

export default connect(mapStateToProps)(CSSModules(UsersStatus, styles)); 
