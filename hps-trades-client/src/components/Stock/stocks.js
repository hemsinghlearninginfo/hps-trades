import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';

import { stockActions } from '../../_actions';
import styles from './stock.css'
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import { dataManager } from '../../dataManager';
import 'react-datepicker/dist/react-datepicker.css';

class Stocks extends Component {

    constructor(props) {
        super(props);

        const user = this.props.authentication.user;
        if (user == null || user.token == null) {
            this.props.history.push('/');
        }

        this.state = {
            isAdd: false,
            isEdit: false,
            stocks: [],
            marketTypes: [],
            addUpdateStock: this.addNewObject(),
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.handleDBOperation('MarketType');
    }

    addNewObject = () => {
        return {
            id: '',
            market: '',
            name: '',
            symbol: '',
            expiryDate: '',
            isFuture: false,
            quantity: '',
            unit: '',
            isIndex: false,
            isDerivates: false,
            derivatesType: ''
        }
    }


    handleDBOperation = (operation) => {
        if (operation == 'MarketType') {
            stockActions.getMarket()
                .then((responseText) => {
                    return responseText;
                })
                .then((response) => {
                    let marketTypes = response.map(function (item) {
                        return ({
                            id: item._id,
                            name: item.name,
                            description: item.description
                        });
                    });
                    this.setState({ marketTypes });
                });
        }
    }

    addEmptyItem = () => {
        this.setState({
            isAdd: !this.state.isAdd,
            addUpdateStock: this.addNewObject(),
        });
    }

    handleChange(event, ctrl = "") {
        const { addUpdateStock } = this.state;
        if (event != null) {
            if (event._isAMomentObject !== null && event._isAMomentObject && ctrl !== "") {
                this.setState({
                    addUpdateStock: {
                        ...addUpdateStock,
                        [ctrl]: moment(event._d)
                    }
                });
            }
            else {
                const { name, value } = event.target;
                this.setState({
                    addUpdateStock: {
                        ...addUpdateStock,
                        [name]: value
                    }
                });

                // if (event.target.name === "eventType") {
                //     let eventTypeDescription = this.state.eventTypes.filter(function (f) {
                //         return f.id === value
                //     })
                //         .map(function (obj) {
                //             return obj.description;
                //         });
                //     this.setState({
                //         eventTypeDescription
                //     })
                // }
            }
        }
        else if (ctrl != null) {
            this.setState({
                addUpdateStock: {
                    ...addUpdateStock,
                    [ctrl]: ''
                }
            });
        }
    }


    render() {
        const { isAdd, addUpdateStock, marketTypes } = this.state;

        let marketSelectOptionsHTML = marketTypes.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        });

        const formHTML = isAdd && (<div className="row">
            <div className="addBox w-100">
                <div className="addBoxHeading">{(addUpdateStock !== null && addUpdateStock.id !== '') ? 'Edit Stock Details' : 'Add New Stock Details'}</div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <label className="control-label"><strong>Type</strong></label>
                            <select className="form-control required" name="market" value={addUpdateStock.market} onChange={this.handleChange}>
                                <option>Select Type</option>
                                {marketSelectOptionsHTML}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="control-label"><strong>Company Name</strong></label>
                            <input className="form-control required" name="name" type="text" value={addUpdateStock.name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="control-label"><strong>Symbol</strong></label>
                            <input className="form-control required" name="symbol" type="text" value={addUpdateStock.symbol} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isFuture" value={addUpdateStock.isFuture} onChange={this.handleChange} />
                                <strong>&nbsp;Is Future</strong>
                            </label>
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isIndex" value={addUpdateStock.isIndex} onChange={this.handleChange} />
                                <strong>&nbsp;Is Index</strong>
                            </label>
                        </div>
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (
                            <div className="form-group col-md-3">
                                <label className="control-label"><strong>Expiry Date</strong></label>
                                <label className="calCtrl" onClick={e => e.preventDefault()}>
                                    <DatePicker className="form-control"
                                        minDate={moment()}
                                        selected={addUpdateStock.expiryDate}
                                        onChange={(e) => this.handleChange(e, "toDate")}
                                        dateFormat="DD-MM-YY"
                                        preventOpenOnFocus={true}
                                    />
                                </label>
                            </div>
                        )}
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (<div className="form-group col-md-3">
                            <label className="control-label"><strong>Quantity</strong></label>
                            <input className="form-control required" name="quantity" type="text" value={addUpdateStock.quantity} onChange={this.handleChange} />
                        </div>
                        )}
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (<div className="form-group col-md-3">
                            <label className="control-label"><strong>Unit</strong></label>
                            <input className="form-control required" name="uni" type="text" value={addUpdateStock.unit} onChange={this.handleChange} />
                        </div>
                        )}
                    </div>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isDerivates" value={addUpdateStock.isDerivates} onChange={this.handleChange} />
                                <strong>&nbsp; Is Derivate</strong>
                            </label>
                        </div>
                        {addUpdateStock.isDerivates && (
                            <div className="form-group col-md-3">
                                <label className="control-label"><strong>Derivates Type</strong></label>
                                <select className="form-control required" name="market" value={addUpdateStock.market} onChange={this.handleChange}>
                                    <option>Select Type</option>
                                    <option key="CE">Call</option>
                                    <option key="PE">Put</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-2 pull-right">
                            <button type="submit" className="btn btn-sm btn-primary" onClick={this.handleAddEventItem}>{getIcon(iconConstants.SAVE)} Save</button>
                            {' '}
                            <button type="button" className="btn btn-sm btn-warning" onClick={this.addEmptyItem}>{getIcon(iconConstants.CANCEL)} Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);

        return (
            <Components.PageTemplate iconType={iconConstants.STOCK} heading="Market Stocks">
                <div className="mainContainer">
                    {!isAdd && (
                        <div className="row"><a href="#" className="btn btn-info btn-sm" title="Add New Stock Details" onClick={this.addEmptyItem} >{getIcon(iconConstants.ADD)} Add New Stock Details</a></div>
                    )}
                    {formHTML}
                </div>
            </Components.PageTemplate>
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

const connectedStocksPage = connect(mapStateToProps)(CSSModules(Stocks, styles));
export { connectedStocksPage as Stocks }; 
