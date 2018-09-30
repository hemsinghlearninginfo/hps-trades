import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './User.css';

import Components from '../';

class UserPreference extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Components.PageTemplate heading="User Preferences">
                <div>
                    privacy policy
                </div>
            </Components.PageTemplate>
        );
    }

}

export default (CSSModules(UserPreference, styles));
