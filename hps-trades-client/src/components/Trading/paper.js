import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


import styles from './trading.css'
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
// import { stockActions } from '../../_actions';
// import { utils } from '../../_helpers';
import 'react-datepicker/dist/react-datepicker.css';

class PaperTrade extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            showModal: false,
            showModalWindow: false,
            moalWindowType: '',

            isMaximizeWindow: false,

            isDropDownOpen: false,
            dropDownSelectedLabel: 'All'
        };
    }

    showModal = (modalWindowType) => {
        this.setState({ showModalWindow: true, modalWindowType });
        if (modalWindowType === 'Add Namespace') {
            this.setState({ dropDownSelectedLabel: '+ Add New Namespace' });
        }
    }

    hideModal = () => {
        this.setState({ showModalWindow: false, dropDownSelectedLabel: 'All' });
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user === null || user.token === null || user.lenth === 0) {
            this.props.history.push('/');
        }
    }

    windowSize = (objWindowSize) => {
        this.setState({ isMaximizeWindow: (objWindowSize === iconConstants.WINDOWMAXIMIZE) });
    }

    setDropDownLabel = (dropDownSelectedLabel) => this.setState({ dropDownSelectedLabel });
    toggleOpen = () => this.setState({ isDropDownOpen: !this.state.isDropDownOpen });

    render() {
        const { isMaximizeWindow, isDropDownOpen, modalWindowType, dropDownSelectedLabel } = this.state;
        const { requestLoading } = this.props;
        const menuClass = `dropdown-menu${isDropDownOpen ? " show" : ""}`;
        return (
            <Components.PageTemplate iconType={iconConstants.PAPERTRADE} heading="Paper Trading" >
                {requestLoading && (<Components.Loading message="loading" />)}
                <div className={"mainContainer" + (isMaximizeWindow ? " trade-list-full" : "")}>
                    <Components.ModalWindow
                        heading={modalWindowType}
                        show={this.state.showModalWindow}
                        handleClose={this.hideModal}>
                        {
                            (modalWindowType === 'Add Rule' && <Components.AddRule />) ||
                            (modalWindowType === 'Add Namespace' && <Components.AddNameSpace />)
                        }
                    </Components.ModalWindow>
                    <div className="container tradding-Controls">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="dropdown" onClick={this.toggleOpen}>
                                    <button
                                        className="btn btn-primary dropdown-toggle btn-sm"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true">
                                        {dropDownSelectedLabel}
                                    </button>
                                    <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                        <button className={"dropdown-item btn-sm" + (dropDownSelectedLabel === "All" ? " active" : "")} onClick={() => this.setDropDownLabel('All')}>All</button>
                                        {/* <button className={"dropdown-item btn-sm" + (dropDownSelectedLabel === "NSE Future" ? " active" : "")} onClick={() => this.setDropDownLabel('NSE Future')}>NSE Future</button>
                                        <button className={"dropdown-item btn-sm" + (dropDownSelectedLabel === "MCX Future" ? " active" : "")} onClick={() => this.setDropDownLabel('MCX Future')}>MCX Future</button>
                                        <button className={"dropdown-item btn-sm" + (dropDownSelectedLabel === "NSE Cash" ? " active" : "")} onClick={() => this.setDropDownLabel('NSE Cash')}>NSE Cash</button> */}
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item btn-sm" onClick={() => this.showModal('Add Namespace')}>+ Add New Namespace</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <div className="float-right">
                                    <Components.ShowRules />
                                    {' '}
                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => this.showModal('Add Rule')}>+ Rule</button>
                                    {' '}
                                    <button type="button" className="btn btn-sm btn-warning" title={isMaximizeWindow ? "Restore" : "Maximize"}
                                        onClick={() => this.windowSize(isMaximizeWindow ? iconConstants.WINDOWRESTORE : iconConstants.WINDOWMAXIMIZE)}>
                                        {getIcon(isMaximizeWindow ? iconConstants.WINDOWRESTORE : iconConstants.WINDOWMAXIMIZE)}
                                    </button>
                                </div></div>
                        </div>
                    </div>


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
