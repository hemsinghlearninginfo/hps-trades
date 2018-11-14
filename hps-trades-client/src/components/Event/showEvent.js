import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import socketIOClient from "socket.io-client";

import styles from './event.css';
import Wrapper from '../../hoc/Wrapper';
import { myConfig } from '../../config';

class ShowEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            response: false,
            type: ''
        }
    }

    componentDidMount() {
        const socket = socketIOClient(myConfig.ApiUrl);
        socket.on(myConfig.SocketEventFromAPI, data => data);
    }

    render() {
        return (
            <Wrapper>
                <div className="notice notice-danger notice-lg">
                    <strong>Notice</strong> notice-danger
                </div>
                <div className="notice notice-info">
                    <strong>Notice</strong> notice-info
                </div>
            </Wrapper>
        )
    }
}

const connectedShowEventPage = (CSSModules(ShowEvent, styles));
export { connectedShowEventPage as ShowEvent }; 