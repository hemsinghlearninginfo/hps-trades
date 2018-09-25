import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './Layout.css';
import Aux from '../../hoc/Aux';
import Components from '../index';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Components.Header />
                <main className="mainContainer">
                    {this.props.children}
                </main>
                <Components.Footer />
            </Aux>
        )
    }
}

export default CSSModules(Layout, styles);