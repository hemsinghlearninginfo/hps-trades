import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import styles from './User.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';

class UserMapping extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddNew: false,
            isEdit: false,
            mappings: [],
            users: [],
            newMapping: {
                id: null,
                user: '',
                master: '',
                comment: '',
            },
            isSubmitted: false,
            isNewMappingUnique: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.markAsEdit = this.markAsEdit.bind(this);
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user == null || user.token == null) {
            this.props.history.push('/');
        }
        else {
            this.getAllMapping();
            this.getAllUsers();
        }
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
                        markForActiveAndActive: false,
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
            isAddNew: true,
            isEdit: false,
            newMapping: {
                id: null,
                user: '',
                master: '',
                comment: '',
            },
            isSubmitted: false,
        });
    }

    cancel = () => {
        const { mappings } = this.state;
        for (let i = 0; i < mappings.length; i++) {
            mappings[i].markForActiveAndActive = false;
        }
        this.setState({
            isAddNew: false,
            isEdit: false,
            mappings
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newMapping } = this.state;
        let isNewMappingUnique = this.isUnique();
        this.setState({ isSubmitted: true, isNewMappingUnique });
        if (newMapping.user && newMapping.master && newMapping.user !== newMapping.master && isNewMappingUnique) {
            var userMapping = {
                id: newMapping.id,
                masterUserId: newMapping.master,
                childUserId: newMapping.user,
                comment: newMapping.comment,
            }
            const { dispatch } = this.props;
            dispatch(userActions.addUpdateUserMapping(userMapping));
            this.getAllMapping();
            this.setState({ isAddNew: false, isEdit: false });
        }
    }

    isUnique = () => {
        let isUnique = true;
        const { mappings, newMapping } = this.state;
        if (mappings.length > 0) {
            let foundUser = mappings.filter(function (user) {
                return (user.masterUserId === newMapping.master && user.childUserId === newMapping.user) ? true : false;
            });
            if (foundUser !== null && foundUser.length > 0 && newMapping.id !== foundUser[0].id) {
                isUnique = false;
            }
        }
        return isUnique;
    }

    markAsEdit = (index) => {
        const { mappings, newMapping } = this.state;
        if (index >= 0) {
            mappings[index].markForActiveAndActive = !mappings[index].markForActiveAndActive;
            newMapping.id = mappings[index].id;
            newMapping.user = mappings[index].childUserId;
            newMapping.master = mappings[index].masterUserId;
            newMapping.comment = mappings[index].comment;
            newMapping.isActive = mappings[index].isActive;
        }
        this.setState({
            isAddNew: false,
            isEdit: true,
            mappings,
            newMapping,
            isSubmitted: false,
            isNewMappingUnique: false
        });
    }

    formDesign = (isNewUser, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML) => {
        return (<form name="form" onSubmit={this.handleSubmit}>
            <div className="table-responsive">
                <table className="table userMappingTable">
                    <thead>
                        <tr>
                            <th colSpan="4" className="text-center">{(isNewUser ? 'Add New' : 'Edit') + ' User Mapping with Master'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isSubmitted && newMapping.master && newMapping.user
                            && newMapping.master === newMapping.user &&
                            <tr>
                                <td colSpan="4">
                                    <div className="help-block">Master and child can't be same.</div>
                                </td>
                            </tr>
                        }
                        {
                            isSubmitted && newMapping.master && newMapping.user
                            && !isNewMappingUnique &&
                            <tr>
                                <td colSpan="4">
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
                            <td rowSpan="2">Comment</td>
                            <td rowSpan="2"><textarea rows="5" cols="80" name="comment" value={newMapping.comment} onChange={this.handleChange}></textarea></td>
                        </tr>
                        <tr>
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
                        </tr>
                        <tr>
                            <td className="text-right" colSpan="4">
                                <button className="btn btn-sm btn-success" type="submit">{(isNewUser ? 'Save' : 'Update')}</button>
                                {' '}
                                <button className="btn btn-sm btn-danger" type="button" onClick={this.cancel}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>);
    }

    render() {
        const { isAddNew, isEdit, users, newMapping, isSubmitted, mappings, isNewMappingUnique } = this.state;

        const selectMasterOptionsHTML = users.map((item) => {
            return (
                item.type === 'Master' && <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
            )
        });

        const selectOptionsHTML = users.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
            )
        });

        const addNewFormHTML = (isAddNew && this.formDesign(true, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML));

        const addNewButtonHTML = (!isAddNew && !isEdit &&
            <button className="btn btn-primary btn-sm" title="Add New User Mapping Details" onClick={this.addNew}>{getIcon(iconConstants.ADD)}Add New</button>
            || 'Action'
        )

        let userMappingHTML = ''
        if (mappings.length > 0) {
            userMappingHTML = mappings.map((item, index) => {
                return (
                    (!item.markForActiveAndActive && <tr key={item.id} className="danger">
                        <td><a className="btn btn-sm btn-warning" title="Edit" onClick={this.markAsEdit.bind(this, index)}>{getIcon(iconConstants.EDIT)}</a></td>
                        <td>{item.masterUserName}</td>
                        <td>{item.childUserName}</td>
                        <td>{item.isActive ? 'true' : 'false'}</td>
                        <td>{item.comment}</td>
                    </tr>) ||
                    (item.markForActiveAndActive && !isAddNew && isEdit && <tr key={item.id} className="danger">
                        <td colSpan="5">{this.formDesign(false, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML)}</td>
                    </tr>));
            });
        }
        else {
            userMappingHTML = <tr><td colSpan="5">No Data Found...</td></tr>
        }

        return (
            <Components.PageTemplate iconType={iconConstants.USER_MAPPING} heading="User Mapping">
                <div className="table-responsive">
                    <table className="table table-hover bg-white border shadow userMapping">
                        <thead>
                            <tr className="font-weight-bold bg-info text-light">
                                <td className="align-middle">{addNewButtonHTML}</td>
                                <td className="align-middle">Master</td>
                                <td className="align-middle">User</td>
                                <td className="align-middle">Active</td>
                                <td className="align-middle">Comment</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userMappingHTML}
                        </tbody>
                    </table>
                    {addNewFormHTML}
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
