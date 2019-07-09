import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
//import Wrapper from '../../hoc/Wrapper';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


import styles from './trading.css'
import { iconConstants } from '../../_constants';
// import { getIcon } from '../../_helpers/';
// import { stockActions } from '../../_actions';
// import { utils } from '../../_helpers';
import 'react-datepicker/dist/react-datepicker.css';

class ShowRules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            showModal: false
        };
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user === null || user.token === null || user.lenth === 0) {
            this.props.history.push('/');
        }
    }

    render() {
        const { requestLoading } = this.props;
        return (
            <div className="d-inline">
                {requestLoading && (<Components.Loading message="loading" />)}
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-sm btn-success">Buy</button>
                    <button type="button" className="btn btn-sm btn-info">Info</button>
                    <button type="button" className="btn btn-sm btn-danger">Sell</button>
                </div>
            </div>
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

const connectedShowRulesPage = connect(mapStateToProps)(CSSModules(ShowRules, styles));
export { connectedShowRulesPage as ShowRules }; 
