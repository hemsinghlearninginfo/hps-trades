import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './Layout.css';
import Wrapper from '../../hoc/Wrapper';
import Components from '../index';

class Layout extends Component {
    render () {
        return (
            <Wrapper>
                 <Components.Header />
                <main className="mainContainer">
                    {this.props.children}
                </main>
                <Components.Footer />
            </Wrapper>
        )
    }
}

export default CSSModules(Layout, styles);