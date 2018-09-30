import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './User.css';
import {iconConstants } from '../../_constants';

import Components from '../';


class UserPreference extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Components.PageTemplate iconType={iconConstants.USER_PREFERENCE} heading="User Preferences">
                <div>
                    privacy policy
                </div>
            </Components.PageTemplate>
        );
    }

}

export default (CSSModules(UserPreference, styles));
