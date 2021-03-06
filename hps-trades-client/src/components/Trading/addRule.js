import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


import styles from './trading.css'
import { iconConstants } from '../../_constants';
// import { getIcon } from '../../_helpers/';
import { tradeActions } from '../../_actions';
import { dataManager } from '../../dataManager';
// import { utils } from '../../_helpers';

class AddRule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            heading: '',
            description: '',
            ruleType: '',
            isError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = this.props.authentication.user;
        if (user === null || user.token === null || user.lenth === 0) {
            this.props.history.push('/');
        }
    }


    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { heading, description, ruleType } = this.state;
        if (heading === '' || description === '' || ruleType === '') {
            this.setState({ isError: true });
        }
        else {
            this.setState({ isError: false });
            const submitRule = {
                username: dataManager.getCurrentUser()._id,
                heading,
                description,
                ruleType,
            }
            dispatch(tradeActions.addUpdateRules(submitRule));
        }
    }

    render() {
        const { isError } = this.state;
        const { requestLoading } = this.props;
        return (
            <Wrapper>
                {requestLoading && (<Components.Loading message="loading" />)}
                <form name="form" onSubmit={this.handleSubmit}>
                    {isError && <div><Components.Alert message="Please fill all values." type="alert-danger" /></div>}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Heading</span>
                        </div>
                        <input type="text" className="form-control required" name="heading" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Description</span>
                        </div>
                        <textarea className="form-control required" name="description" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Type</span>
                        </div>
                        <select className="form-control required" name="ruleType" onChange={this.handleChange}>
                            <option>Select</option>
                            <option>Buy</option>
                            <option>Sell</option>
                            <option>Info</option>
                        </select>
                    </div>
                    <div className="float-right">
                        <button className="btn btn-sm btn-info">Save</button>
                    </div>
                </form>
            </Wrapper>
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

const connectedAddRulePage = connect(mapStateToProps)(CSSModules(AddRule, styles));
export { connectedAddRulePage as AddRule }; 
