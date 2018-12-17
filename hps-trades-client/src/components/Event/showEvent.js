import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import socketIOClient from "socket.io-client";
import { myConfig } from '../../config';

import styles from './event.css';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import Wrapper from '../../hoc/Wrapper';
import { eventActions } from '../../_actions';

class ShowEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventData: []
        }
    }

    componentDidMount() {
        const socket = socketIOClient(myConfig.ApiUrl);
        socket.on(myConfig.SocketEventFromAPI, data => {
            var eventData = data.map(function (item) {
                return {
                    isClose: item.eventType.isAllowToClose,
                    heading: item.heading,
                    message: item.message,
                    id: item.id,
                    useRoleId: item.userRoleId
                };
            });
            this.setState({ eventData })
        });
    }

    render() {
        let eventHTML = [];
        const { eventData } = this.state;
        if (eventData.length > 0) {
            eventHTML = eventData.map((item, index) => {
                return ((!item.isClose) ?
                    (<div className="notice notice-danger notice-lg"  key={index}>
                        <strong>{item.heading}</strong> {item.message}
                    </div>)
                    : (<div className="notice notice-info" key={index}>
                        <strong>{item.heading}</strong> {item.message}
                        <div className="closeButton"><a>{getIcon(iconConstants.CLOSE)}</a></div>
                    </div>))
            });
        }
        return (
            <Wrapper>
                {eventHTML}
            </Wrapper>
        )
    }
}

const connectedShowEventPage = (CSSModules(ShowEvent, styles));
export { connectedShowEventPage as ShowEvent }; 