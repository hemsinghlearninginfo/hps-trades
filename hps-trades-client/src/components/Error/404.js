import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Error.css';
import { iconConstants } from '../../_constants'
import { getIcon } from '../../_helpers/'

const error404 = () => (
    <div className="wrapper">
        <div className="container-fluid" id="top-container-fluid-nav">
            <div className="container">
            </div>
        </div>
        <div className="container-fluid" id="body-container-fluid">
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-1">4<span className="Icon404">{getIcon(iconConstants.MACHINE)}</span>4</h1>
                    <h1 className="display-3">ERROR</h1>
                    <p className="lower-case">Aw !! webpage not found please try to refresh</p>
                    <p className="lower-case">Maybe the page is under maintenance</p>
                </div>
            </div>
        </div>
    </div>
);

export default CSSModules(error404, styles);