import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


import styles from './trading.css'
import { iconConstants } from '../../_constants';
// import { getIcon } from '../../_helpers/';
// import { stockActions } from '../../_actions';
// import { utils } from '../../_helpers';
import 'react-datepicker/dist/react-datepicker.css';

class PaperTrade extends Component {

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
            <Components.PageTemplate iconType={iconConstants.PAPERTRADE} heading="Paper Trading" >
                {requestLoading && (<Components.Loading message="loading" />)}
                <div className="mainContainer">
                    <Components.ModalWindow heading="test heading" show={this.state.show} handleClose={this.hideModal} >
                        <p>Modal</p>
                        <p>Data</p>
                    </Components.ModalWindow>
                    <button type='button' onClick={this.showModal}>Open</button>
                    <div className="table-responsive-sm text-nowrap">
                        <table className="table table-sm table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time Frame</th>
                                    <th scope="col">Stock Name</th>
                                    <th scope="col">Script</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Way</th>
                                    <th scope="col">#Lot Size</th>
                                    <th scope="col">#Size</th>
                                    <th scope="col">Entry</th>
                                    <th scope="col">Stop Loss</th>
                                    <th scope="col">Risk Point</th>
                                    <th scope="col">Risk</th>
                                    <th scope="col">Exit</th>
                                    <th scope="col">Exit Point</th>
                                    <th scope="col">P&amp;L</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Components.PageTemplate >
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

const connectedPaperTradePage = connect(mapStateToProps)(CSSModules(PaperTrade, styles));
export { connectedPaperTradePage as PaperTrade }; 
