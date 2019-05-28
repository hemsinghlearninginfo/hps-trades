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

        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.activeInActiveUser = this.activeInActiveUser.bind(this);
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
                this.setState({ users: response });
            });
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

    // addNew = () => {
    //     this.setState({
    //         isAddNew: true,
    //         isEdit: false,
    //         newMapping: {
    //             id: null,
    //             user: '',
    //             master: '',
    //             comment: '',
    //         },
    //         isSubmitted: false,
    //     });
    // }

    // cancel = () => {
    //     const { mappings } = this.state;
    //     for (let i = 0; i < mappings.length; i++) {
    //         mappings[i].markForActiveAndActive = false;
    //     }
    //     this.setState({
    //         isAddNew: false,
    //         isEdit: false,
    //         mappings
    //     });
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const { newMapping } = this.state;
    //     let isNewMappingUnique = this.isUnique();
    //     this.setState({ isSubmitted: true, isNewMappingUnique });
    //     if (newMapping.user && newMapping.master && newMapping.user !== newMapping.master && isNewMappingUnique) {
    //         var userMapping = {
    //             masterUserId: newMapping.master,
    //             childUserId: newMapping.user,
    //         }
    //         const { dispatch } = this.props;
    //         dispatch(userActions.addUpdateUserMapping(userMapping));
    //         this.addNew();
    //         this.getAllMapping();
    //     }
    // }

    // isUnique = () => {
    //     let isUnique = true;
    //     const { mappings, newMapping } = this.state;
    //     if (mappings.length > 0) {
    //         let foundUser = mappings.filter(function (user) {
    //             return (user.masterUserId === newMapping.master && user.childUserId === newMapping.user) ? true : false;
    //         });
    //         if (foundUser !== null && foundUser.length > 0) {
    //             isUnique = false;
    //         }
    //     }
    //     return isUnique;
    // }

    // activeInActiveUser = (otherObjectState, index) => {

    //     const { mappings, newMapping } = this.state;
    //     for (let i = 0; i < mappings.length; i++) {
    //         mappings[i].markForActiveAndActive = otherObjectState;
    //     }
    //     if (index >= 0) {
    //         mappings[index].markForActiveAndActive = !mappings[index].markForActiveAndActive;
    //         newMapping.id = mappings[index].id;
    //         newMapping.user = mappings[index].childUserId;
    //         newMapping.master = mappings[index].masterUserId;
    //         newMapping.comment = mappings[index].comment;
    //     }
    //     else {
    //         newMapping.id = null;
    //         newMapping.user = '';
    //         newMapping.master = '';
    //         newMapping.comment = '';
    //     }
    //     this.setState({
    //         isAddNew: false,
    //         isEdit: true,
    //         mappings,
    //         newMapping,
    //         isSubmitted: false,
    //         isNewMappingUnique: false
    //     });
    // }

    // formDesign = (isNewUser, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML) => {
    //     return (<form name="form" onSubmit={this.handleSubmit}>
    //         <div className="table-responsive">
    //             <table className="table userMappingTable">
    //                 <thead>
    //                     <tr>
    //                         <th colSpan="4" className="text-center">{(isNewUser ? 'Add New' : 'Edit') + ' User Mapping with Master'}</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {
    //                         isSubmitted && newMapping.master && newMapping.user
    //                         && newMapping.master === newMapping.user &&
    //                         <tr>
    //                             <td colSpan="4">
    //                                 <div className="help-block">Master and child can't be same.</div>
    //                             </td>
    //                         </tr>
    //                     }
    //                     {
    //                         isSubmitted && newMapping.master && newMapping.user
    //                         && !isNewMappingUnique &&
    //                         <tr>
    //                             <td colSpan="4">
    //                                 <div className="help-block">User and Master mapping is already exists.</div>
    //                             </td>
    //                         </tr>
    //                     }
    //                     <tr>
    //                         <td>Master</td>
    //                         <td>
    //                             <select className="form-control required" name="master" value={newMapping.master} onChange={this.handleChange}>
    //                                 <option>Select Master</option>
    //                                 {selectMasterOptionsHTML}
    //                             </select>
    //                             {
    //                                 isSubmitted && !newMapping.master &&
    //                                 <div className="help-block">Select Master is required</div>
    //                             }
    //                         </td>
    //                         <td rowSpan="2">Comment</td>
    //                         <td rowSpan="2"><textarea rows="5" cols="80"></textarea></td>

    //                     </tr>
    //                     <tr>
    //                         <td>User</td>
    //                         <td>
    //                             <select className="form-control required" name="user" value={newMapping.user} onChange={this.handleChange}>
    //                                 <option>Select User</option>
    //                                 {selectOptionsHTML}
    //                             </select>
    //                             {
    //                                 isSubmitted && !newMapping.user &&
    //                                 <div className="help-block">Select User is required</div>
    //                             }
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td className="text-right" colSpan="4">
    //                             <button className="btn btn-sm btn-success" type="submit">{(isNewUser ? 'Save' : 'Update')}</button>
    //                             {' '}
    //                             <button className="btn btn-sm btn-danger" type="button" onClick={this.cancel}>Cancel</button>
    //                         </td>
    //                     </tr>
    //                 </tbody>
    //             </table>
    //         </div>
    //     </form>);
    // }

    render() {
        const { users } = this.state;
        let userHTMLTable = users.map((item, index) => {
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

        // const { isAddNew, isEdit, users, newMapping, isSubmitted, mappings, isNewMappingUnique } = this.state;

        // const selectMasterOptionsHTML = users.map((item) => {
        //     return (
        //         item.type === 'Master' && <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
        //     )
        // });

        // const selectOptionsHTML = users.map((item) => {
        //     return (
        //         <option key={item.id} value={item.id}>{item.type + ' - ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')'}</option>
        //     )
        // });

        // const addNewFormHTML = (isAddNew && this.formDesign(true, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML));

        // const addNewButtonHTML = (!isAddNew && !isEdit &&
        //     <button className="btn btn-sm btn-success" onClick={this.addNew}>Add New</button>
        // )

        // let userMappingHTML = ''
        // if (mappings.length > 0) {
        //     userMappingHTML = mappings.map((item, index) => {
        //         return (
        //             (!item.markForActiveAndActive && <tr key={item.id} className="danger">
        //                 <td><button className={`btn btn-sm ${item.isActive ? 'btn-danger' : 'btn-success'}`} onClick={this.activeInActiveUser.bind(this, false, index)}>{item.isActive ? 'Mark inActive' : 'Mark Active'}</button></td>
        //                 <td>{item.masterUserName}</td>
        //                 <td>{item.childUserName}</td>
        //                 <td>{item.isActive ? 'true' : 'false'}</td>
        //                 <td>{item.comment}</td>
        //             </tr>) ||
        //             (item.markForActiveAndActive && !isAddNew && isEdit && <tr key={item.id} className="danger">
        //                 <td colSpan="5">{this.formDesign(false, isSubmitted, isNewMappingUnique, newMapping, selectMasterOptionsHTML, selectOptionsHTML)}</td>
        //             </tr>));
        //     });
        // }

        return (
            <Components.PageTemplate iconType={iconConstants.USERS_STATUS} heading="User Status">
                <div className="table-responsive">
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
                    {/* {addNewFormHTML}
                    {addNewButtonHTML} */}
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
