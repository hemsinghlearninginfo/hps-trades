import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';

import { stockActions } from '../../_actions';
import { utils } from '../../_helpers';
import styles from './stock.css'
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';
import 'react-datepicker/dist/react-datepicker.css';

class Stocks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isStockAlreadyAdded: false,
            isError: false,
            isAdd: false,
            isEdit: false,
            stocks: [],
            marketTypes: [],
            addUpdateStock: this.addNewObject(),
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDBOperation('MarketType');
        this.handleDBOperation('getAll');
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user === null || user.token === null || user.lenth === 0) {
            this.props.history.push('/');
        }
        else {
            this.handleDBOperation('MarketType');
            this.handleDBOperation('getAll');
        }
    }

    addNewObject = () => {
        return {
            id: '',
            market: 'Select Type',
            name: '',
            symbol: '',
            expiryDate: '',
            isFuture: false,
            quantity: '',
            unit: '',
            isIndex: false,
            isDerivates: false,
            derivatesType: 'Select Type',
            isActive: true,
            isDeleted: false
        }
    }

    handleDBOperation = (operation) => {
        if (operation === 'MarketType') {
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
        else if (operation === "getAll") {
            stockActions.getAll()
                .then((responseText) => {
                    return responseText;
                })
                .then((stocks) => {
                    this.setState({ stocks });
                });
        }
    }

    isAddUpdateNewItem = (isAction) => {
        this.setState({
            isAdd: isAction ? !this.state.isAdd : isAction,
            addUpdateStock: isAction ? this.addNewObject() : null,
            submitted: false,
            isStockAlreadyAdded: false
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
                if (name.indexOf("is") !== -1) {
                    this.setState({
                        addUpdateStock: {
                            ...addUpdateStock,
                            [name]: !addUpdateStock[name]
                        }
                    });
                }
                else {
                    this.setState({
                        addUpdateStock: {
                            ...addUpdateStock,
                            [name]: value
                        }
                    });
                }
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { dispatch } = this.props;
        const { addUpdateStock } = this.state;

        if ((!(addUpdateStock.market || addUpdateStock.name || addUpdateStock.symbol)) ||
            (((addUpdateStock.isFuture || addUpdateStock.isIndex) && (addUpdateStock.expiryDate === "" || addUpdateStock.quantity === "" || addUpdateStock.unit === ""))
                || (addUpdateStock.isDerivates && addUpdateStock.derivatesType === "")
            )) {
            this.setState({ isError: true });
        }
        else {
            if (this.isStockUnique()) {
                this.setState({ isError: false, isStockAlreadyAdded: false });
                let submitStock = this.getFinalObjectToSubmit(addUpdateStock);
                dispatch(stockActions.addUpdate(submitStock));
                this.setState({ isAdd: false, stocks: [] });
                this.handleDBOperation('getAll');
                this.forceUpdate();
            }
            else {
                this.setState({ isStockAlreadyAdded: true, submitted: false });
            }
        }
    }

    isStockUnique() {
        let isUnique = true;
        const { stocks, addUpdateStock } = this.state;
        if (stocks.length > 0) {
            let isAdd = addUpdateStock.id === "" ? true : false;
            let foundStock = stocks.filter(function (stock) {
                return (stock.market.id === addUpdateStock.market && stock.symbol === addUpdateStock.symbol) ? true : false;
            });
            if (isAdd && foundStock !== null && foundStock.length > 0) {
                isUnique = false;
            }
            else if (!isAdd && foundStock !== null && foundStock.length > 1) {
                isUnique = false;
            }
        }
        return isUnique;
    }

    getFinalObjectToSubmit = (addUpdateStock) => {
        return ({
            id: addUpdateStock.id,
            market: addUpdateStock.market,
            name: addUpdateStock.name,
            symbol: addUpdateStock.symbol,
            isIndex: addUpdateStock.isIndex,
            isFuture: addUpdateStock.isFuture,
            quantity: (addUpdateStock.isIndex || addUpdateStock.isFuture) ? addUpdateStock.quantity : null,
            unit: (addUpdateStock.isIndex || addUpdateStock.isFuture) ? addUpdateStock.unit : null,
            expiryDate: (addUpdateStock.isIndex || addUpdateStock.isFuture) ? addUpdateStock.expiryDate : null,
            isDerivates: addUpdateStock.isDerivates,
            derivatesType: addUpdateStock.isDerivates ? addUpdateStock.derivatesType : null,
            isActive: addUpdateStock.isActive,
            isDeleted: addUpdateStock.isDeleted
        });
    }

    editItem = (id) => {
        let foundItem = this.state.stocks.filter((obj) => obj.id === id)[0];
        this.setState({
            isAdd: true,
            addUpdateStock: {
                id: foundItem.id,
                market: foundItem.market.id,
                name: foundItem.name,
                symbol: foundItem.symbol,
                isIndex: foundItem.isIndex,
                isFuture: foundItem.isFuture,
                expiryDate: moment(foundItem.expiryDate === null ? moment() : foundItem.expiryDate),
                quantity: foundItem.quantity,
                unit: foundItem.unit,
                isDerivates: foundItem.isDerivates,
                derivatesType: foundItem.derivatesType,
                isActive: foundItem.isActive,
                isDeleted: foundItem.isDeleted
            }
        });
        utils.scrollToTop();
    }

    render() {
        const { isAdd, addUpdateStock, submitted, isError, marketTypes, stocks, isStockAlreadyAdded } = this.state;
        const { requestLoading } = this.props;

        let marketSelectOptionsHTML = marketTypes.map((item) => {
            return (
                <option key={item.id} value={item.id || ''}>{item.name}</option>
            )
        });

        const formHTML = isAdd && (<div className="row">
            <div className="addBox w-100">
                <div className="addBoxHeading">{(addUpdateStock !== null && addUpdateStock.id !== '') ? 'Edit Stock Details' : 'Add New Stock Details'}</div>
                {isError && <div className="errorBox">Please add all required fields.</div>}
                {isStockAlreadyAdded && <div className="errorBox">Stock details is already added, please verify again.</div>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <label className="control-label"><strong>Type</strong></label>
                            <select className="form-control required" name="market" value={addUpdateStock.market || ''} onChange={this.handleChange}>
                                <option>Select Type</option>
                                {marketSelectOptionsHTML}
                            </select>
                            {
                                submitted && !addUpdateStock.market &&
                                <div className="help-block">Stock Name is required</div>
                            }
                        </div>
                        <div className="form-group col-md-6">
                            <label className="control-label"><strong>Company Name</strong></label>
                            <input className="form-control required" name="name" type="text" value={addUpdateStock.name || ''} onChange={this.handleChange} />
                            {
                                submitted && !addUpdateStock.name &&
                                <div className="help-block">Company Name is required</div>
                            }
                        </div>
                        <div className="form-group col-md-3">
                            <label className="control-label"><strong>Symbol</strong></label>
                            <input className="form-control required" name="symbol" type="text" value={addUpdateStock.symbol || ''} onChange={this.handleChange} />
                            {
                                submitted && !addUpdateStock.symbol &&
                                <div className="help-block">Symbol Name is required</div>
                            }
                        </div>
                    </div>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isFuture" value={addUpdateStock.isFuture || false} checked={this.state.addUpdateStock.isFuture} onChange={this.handleChange} />
                                <strong>&nbsp;Is Future</strong>
                            </label>
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isIndex" value={addUpdateStock.isIndex || false} checked={addUpdateStock.isIndex} onChange={this.handleChange} />
                                <strong>&nbsp;Is Index</strong>
                            </label>
                        </div>
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (
                            <div className="form-group col-md-3">
                                <label className="control-label"><strong>Expiry Date</strong></label>
                                <label className="calCtrl" onClick={e => e.preventDefault()}>
                                    <DatePicker
                                        className="form-control"
                                        minDate={moment()}
                                        selected={addUpdateStock.expiryDate}
                                        onChange={(e) => this.handleChange(e, "expiryDate")}
                                        dateFormat="DD-MM-YY"
                                        preventOpenOnFocus={true}
                                    />
                                </label>
                                {
                                    submitted && (addUpdateStock.isFuture || addUpdateStock.isIndex) && !addUpdateStock.expiryDate &&
                                    <div className="help-block">Expiry Date is required</div>
                                }
                            </div>
                        )}
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (<div className="form-group col-md-3">
                            <label className="control-label"><strong>Quantity</strong></label>
                            <input className="form-control required" name="quantity" type="text" value={addUpdateStock.quantity || ''} onChange={this.handleChange} />
                            {
                                submitted && (addUpdateStock.isFuture || addUpdateStock.isIndex) && !addUpdateStock.quantity &&
                                <div className="help-block">Quantity is required</div>
                            }
                        </div>
                        )}
                        {(addUpdateStock.isFuture || addUpdateStock.isIndex) && (<div className="form-group col-md-3">
                            <label className="control-label"><strong>Unit</strong></label>
                            <input className="form-control required" name="unit" type="text" value={addUpdateStock.unit || ''} onChange={this.handleChange} />
                            {
                                submitted && (addUpdateStock.isFuture || addUpdateStock.isIndex) && !addUpdateStock.unit &&
                                <div className="help-block">Unit is required</div>
                            }
                        </div>
                        )}
                    </div>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <br />
                            <label className="control-label">
                                <input type="checkbox" name="isDerivates" value={addUpdateStock.isDerivates || false} checked={addUpdateStock.isDerivates} onChange={this.handleChange} />
                                <strong>&nbsp; Is Derivate</strong>
                            </label>
                        </div>
                        {addUpdateStock.isDerivates && (
                            <div className="form-group col-md-3">
                                <label className="control-label"><strong>Derivates Type</strong></label>
                                <select className="form-control required" name="derivatesType" value={addUpdateStock.derivatesType || ''} onChange={this.handleChange}>
                                    <option>Select Type</option>
                                    <option key="CE">Call</option>
                                    <option key="PE">Put</option>
                                </select>
                                {
                                    submitted && addUpdateStock.isDerivates && !addUpdateStock.derivatesType &&
                                    <div className="help-block">Derivates Type is required</div>
                                }
                            </div>
                        )}
                    </div>
                    <div className="row col-md-12">
                        <div className="form-group col-md-3">
                            <label className="control-label">
                                <input type="checkbox" name="isActive" value={addUpdateStock.isActive || false} checked={addUpdateStock.isActive} onChange={this.handleChange} />
                                <strong>&nbsp; Is Stock Active</strong>
                            </label>
                        </div>
                        <div className="form-group col-md-3">
                            <label className="control-label">
                                <input type="checkbox" name="isDeleted" value={addUpdateStock.isDeleted || false} checked={addUpdateStock.isDeleted} onChange={this.handleChange} />
                                <strong>&nbsp; Is Stock Delete</strong>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="pull-right">
                            <button type="submit" className="btn btn-sm btn-primary">{getIcon(iconConstants.SAVE)} Save</button>
                            {' '}
                            <button type="button" className="btn btn-sm btn-warning" onClick={() => this.isAddUpdateNewItem(false)}>{getIcon(iconConstants.CANCEL)} Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);

        let allStocks = '';
        let itemsAllStocks = '';
        if (stocks.length > 0) {
            itemsAllStocks = stocks.map((item, index) => {
                return (
                    <tr key={item.id} className={!item.isActive ? "inActive" : item.isDeleted ? "deleted" : ""}>
                        <td>
                            <a className="btn btn-sm btn-warning" title="Edit" onClick={this.editItem.bind(this, item.id)}>{getIcon(iconConstants.EDIT)}</a>
                            {' '}
                            <Components.ConfirmAlert buttonClassName="btn btn-sm btn-dange" buttonLabel="" buttonIcon={getIcon(iconConstants.DELETE)}
                                modalClassName=""
                                title="Confirm" message={"Are you sure to delete " + item.symbol + "-" + item.name + "?"} yesButtonLabel="Ok"
                                cancelButtonLabel="Cancel">
                            </Components.ConfirmAlert>
                        </td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}><strong>{item.market.name}</strong></td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.symbol} - ({item.name})</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.isFuture ? 'Yes' : 'No'}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.isIndex ? 'Yes' : 'No'}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.expiryDate != null ? moment(item.expiryDate).format('DD MMM, YYYY') : null}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.quantity != null ? item.quantity : null}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.unit != null ? item.unit : null}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.isDerivates ? 'Yes' : 'No'}</td>
                        <td className={"align-middle " + (!item.isActive ? "text-muted" : "")}>{item.derivatesType != null ? item.derivatesType : null}</td>
                    </tr>
                );
            });
        }
        else {
            itemsAllStocks = <tr><td colSpan="10">No stock added.</td></tr>;
        }
        allStocks = <div className="table-responsive"><table className="table table-hover bg-white border shadow">
            <thead>
                <tr className="font-weight-bold bg-info text-light">
                    <td>{!isAdd && (
                        <button className="btn btn-primary btn-sm" title="Add New Stock Details" onClick={() => this.isAddUpdateNewItem(true)}>{getIcon(iconConstants.ADD)} Add New</button>
                    )}{isAdd && 'Action'}</td>
                    <td className="align-middle">Market</td>
                    <td className="align-middle">Symbol</td>
                    <td className="align-middle">Is Future</td>
                    <td className="align-middle">Is Index</td>
                    <td className="align-middle">Expiry Date</td>
                    <td className="align-middle">Quantity</td>
                    <td className="align-middle">Unit</td>
                    <td className="align-middle">Is Derivate</td>
                    <td className="align-middle">Derivate Type</td>
                </tr>
            </thead>
            <tbody>{itemsAllStocks}</tbody>
        </table></div>

        return (
            <Components.PageTemplate iconType={iconConstants.STOCK} heading="Market Stocks" >
                {requestLoading && (<Components.Loading message="loading" />)}
                <div className="mainContainer">
                    {formHTML}
                    {allStocks}
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

const connectedStocksPage = connect(mapStateToProps)(CSSModules(Stocks, styles));
export { connectedStocksPage as Stocks }; 
