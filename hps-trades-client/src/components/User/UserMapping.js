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
            isEditNew: false,
            mappings: [],
            users: [],
            newMapping: {
                user: '',
                master: '',
            },
            isSubmitted: false,
            isNewMappingUnique: false,
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
                let mappings = response.map(function (user) {
                    return ({
                        id: user.id,
                        isActive: user.isActive,
                        comment: (user.comment !== null ? user.comment : ''),
                        masterUserId: user.masterUserId.id,
                        masterUserName: `${user.masterUserId.firstName} ${user.masterUserId.lastName} (${user.masterUserId.username})`,
                        childUserId: user.childUserId.id,
                        childUserName: `${user.childUserId.firstName} ${user.childUserId.lastName} (${user.childUserId.username})`,
                    })
                });
                this.setState({ mappings });
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
        this.setState({
            isAddNew: !this.state.isAddNew,
            newMapping: {
                user: '',
                master: '',
            },
            isSubmitted: false,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newMapping } = this.state;
        let isNewMappingUnique = this.isUnique();
        this.setState({ isSubmitted: true, isNewMappingUnique });
        if (newMapping.user && newMapping.master && newMapping.user !== newMapping.master && isNewMappingUnique) {
            var userMapping = {
                masterUserId: newMapping.master,
                childUserId: newMapping.user,
            }
            const { dispatch } = this.props;
            dispatch(userActions.addUpdateUserMapping(userMapping));
            this.addNew();
            this.getAllMapping();
        }
    }

    isUnique = () => {
        let isUnique = true;
        const { mappings, newMapping } = this.state;
        if (mappings.length > 0) {
            let foundUser = mappings.filter(function (user) {
                return (user.masterUserId === newMapping.master && user.childUserId === newMapping.user) ? true : false;
            });
            if (foundUser !== null && foundUser.length > 0) {
                isUnique = false;
            }
        }
        return isUnique;
    }

    editUserMapping = (id) => {
        const { mappings } = this.state;
        let foundUser = mappings.filter(function (user) {
            return (user.id === id);
        })[0];
        if (foundUser !== null) {
            this.setState({
                isEditNew: true,
                newMapping: {
                    user: foundUser.childUserId,
                    master: foundUser.masterUserId,
                },
                isSubmitted: false,
            });
        }
    }

    render() {
        const { isAddNew, isEditNew, users, newMapping, isSubmitted, mappings, isNewMappingUnique } = this.state;

        const selectMasterOptionsHTML = users.map((item) => {
            return (
                item.type == 'Master' && <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
            )
        });

        const selectOptionsHTML = users.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
            )
        });

        const addNewFormHTML = ((isAddNew || isEditNew) &&
            <form name="form" onSubmit={this.handleSubmit}>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="5">Add New User Mapping with Master</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isSubmitted && newMapping.master && newMapping.user
                                && newMapping.master === newMapping.user &&
                                <tr>
                                    <td colSpan="5">
                                        <div className="help-block">Master and child can't be same.</div>
                                    </td>
                                </tr>
                            }
                            {
                                isSubmitted && newMapping.master && newMapping.user
                                && !isNewMappingUnique &&
                                <tr>
                                    <td colSpan="5">
                                        <div className="help-block">User and Master mapping is already exists.</div>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>Master</td>
                                <td>
                                    <select className="form-control required" name="master" value={newMapping.master} onChange={this.handleChange}>
                                        <option>Select Master</option>
                                        {selectMasterOptionsHTML}
                                    </select>
                                    {
                                        isSubmitted && !newMapping.master &&
                                        <div className="help-block">Select Master is required</div>
                                    }
                                </td>
                                <td>User</td>
                                <td>
                                    <select className="form-control required" name="user" value={newMapping.user} onChange={this.handleChange}>
                                        <option>Select User</option>
                                        {selectOptionsHTML}
                                    </select>
                                    {
                                        isSubmitted && !newMapping.user &&
                                        <div className="help-block">Select User is required</div>
                                    }
                                </td>
                                <td className="text-right">
                                    <button className="btn btn-sm btn-success" type="submit">Save</button>
                                    {' '}
                                    <button className="btn btn-sm btn-danger" type="button" onClick={this.addNew}>Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        )

        const addNewButtonHTML = (!isAddNew && !isEditNew &&
            <button className="btn btn-sm btn-success" onClick={this.addNew}>Add New</button>
        )

        let userMappingHTML = ''
        if (mappings.length > 0) {
            userMappingHTML = mappings.map((item) => {
                return (<tr key={item.id} className="danger">
                    <td><button type="button" className={`btn btn-sm ${item.isActive ? 'btn-danger' : 'btn-success'}`} onClick={this.editUserMapping.bind(this, item.id)}>{item.isActive ? 'Mark inActive' : 'Mark Active'}</button></td>
                    <td>{item.masterUserName}</td>
                    <td>{item.childUserName}</td>
                    <td>{item.isActive ? 'true' : 'false'}</td>
                    <td>{item.comment}</td>
                </tr>)
            });
        }

        return (
            <Components.PageTemplate iconType={iconConstants.USER_MAPPING} heading="User Mapping">
                <div>
                    <table className="table table-bordered userMapping">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Master</th>
                                <th>User</th>
                                <th>Active</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userMappingHTML}
                        </tbody>
                    </table>
                    {addNewFormHTML}
                    {addNewButtonHTML}
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

export default connect(mapStateToProps)(CSSModules(UserMapping, styles)); 
