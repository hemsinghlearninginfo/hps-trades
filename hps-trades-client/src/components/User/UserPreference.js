import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './User.css';
import { iconConstants } from '../../_constants';

import Components from '../';


class UserPreference extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Components.PageTemplate iconType={iconConstants.USER_PREFERENCE} heading="User Preferences">
                <div>
                    <table className="table table-hover table-striped userPreferenceTable">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>hemsingh81@gmail.com</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>Hem Singh</td>
                                <td>Edit</td>
                            </tr>
                            <tr>
                                <td>Profile Picture</td>
                                <td>Hem Singh</td>
                                <td>Edit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Components.PageTemplate>
        );
    }

}

export default (CSSModules(UserPreference, styles));
