import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { dataManager } from '../../dataManager';
import styles from './User.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';

class UserPreference extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                firstName: '',
                lastName: ''
            },
            rowChangeNumber: -1
        }
    }

    componentDidMount() {
        this.setState({ userData: dataManager.getCurrentUser() });
    }

    editItem = (type, rowChangeNumber) => {
        this.setState({ rowChangeNumber });
    }

    cancelUpdate = () => {
        this.setState({ rowChangeNumber: -1 });
    }

    render() {
        const { userData, rowChangeNumber } = this.state;
        return (
            <Components.PageTemplate iconType={iconConstants.USER_PREFERENCE} heading="User Preferences">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="table-responsive">
                        <table className="table table-hover table-striped userPreferenceTable">
                            <tbody>
                                <tr>
                                    <td width="20%">Username</td>
                                    <td width="70%">{userData.username}</td>
                                    <td width="10%">{' '}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <span className={rowChangeNumber === 2 ? 'd-none' : 'd-block'}>{userData.firstName} {userData.lastName}</span>
                                        <span className={rowChangeNumber !== 2 ? 'd-none' : 'd-block'}>
                                            <input type="text" className="form-control required userPreferenceTableInput" name="firstName"
                                                placeholder="First Name" defaultValue={userData.firstName} onChange={this.handleChange} />
                                            {' '}
                                            <input type="text" className="form-control required userPreferenceTableInput" name="lastName"
                                                placeholder="First Name" defaultValue={userData.lastName} onChange={this.handleChange} />
                                        </span>
                                    </td>
                                    <td>
                                        <span className={rowChangeNumber !== 2 ? 'd-none' : 'd-block'}>
                                            <a className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, 'name', 2)}>{getIcon(iconConstants.SAVE)}</a>{' '}
                                            <a className="btn btn-sm btn-danger" title="Edit" onClick={this.cancelUpdate.bind(this)}>{getIcon(iconConstants.CANCEL)}</a>
                                        </span>
                                        <span className={rowChangeNumber === 2 ? 'd-none' : 'd-block'}>
                                            <a className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, 'name', 2)}>{getIcon(iconConstants.EDIT)}</a>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Profile Picture</td>
                                    <td>
                                        <span className={rowChangeNumber === 3 ? 'd-none' : 'd-block'}>
                                            Image
                                    </span>
                                        <span className={rowChangeNumber !== 3 ? 'd-none' : 'd-block'}>
                                            Udpate Image
                                    </span>
                                    </td>
                                    <td>
                                        <span className={rowChangeNumber !== 3 ? 'd-none' : 'd-block'}>
                                            <a className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, 'picture', 3)}>{getIcon(iconConstants.SAVE)}</a>{' '}
                                            <a className="btn btn-sm btn-danger" title="Edit" onClick={this.cancelUpdate.bind(this)}>{getIcon(iconConstants.CANCEL)}</a>
                                        </span>
                                        <span className={rowChangeNumber === 3 ? 'd-none' : 'd-block'}>
                                            <a className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, 'picture', 3)}>{getIcon(iconConstants.EDIT)}</a>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </Components.PageTemplate >
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

const connectedUserPreferencePage = connect(mapStateToProps)(CSSModules(UserPreference, styles));
export { connectedUserPreferencePage as UserPreference };
//export default UserPreference ;