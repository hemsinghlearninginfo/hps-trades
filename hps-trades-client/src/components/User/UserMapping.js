import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './User.css';
import { iconConstants } from '../../_constants';

import Components from '../';

class UserMapping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddNew: false,
        }
    }

    addNew = () => {
        this.setState({ isAddNew: !this.state.isAddNew })
    }

    render() {
        const { isAddNew } = this.state;
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
                                <td colSpan="3"><table className="table">
                                    <tr>
                                        <td>Master</td>
                                        <td>Master</td>
                                        <td>User</td>
                                        <td>User</td>
                                        <td>Save Cancel</td>
                                    </tr>
                                    </table></td>
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

export default (CSSModules(UserMapping, styles));
