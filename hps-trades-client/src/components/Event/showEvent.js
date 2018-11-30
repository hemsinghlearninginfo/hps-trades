import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import socketIOClient from "socket.io-client";
import { myConfig } from '../../config';

import styles from './event.css';
import Wrapper from '../../hoc/Wrapper';
import { eventActions } from '../../_actions';

class ShowEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            response: false,
            type: ''
        }
    }

    componentDidMount() {

        let responseData = '';
        const socket = socketIOClient(myConfig.ApiUrl);
        socket.on(myConfig.SocketEventFromAPI, data => {
            console.log(data);
        });
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