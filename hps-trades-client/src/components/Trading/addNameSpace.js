import React, { Component } from 'react';
import Components from '../index';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper';


import styles from './trading.css'
import { tradeActions } from '../../_actions';
import { dataManager } from '../../dataManager';

class AddNameSpace extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            description: '',
            type: '',
            isError: false
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
        const { label, description, type } = this.state;
        if (label === '' || description === '') {
            this.setState({ isError: true });
        }
        else {
            this.setState({ isError: false });
        }
        //const submitRule = {
        //     username: dataManager.getCurrentUser()._id,
        //     label,
        //     description,
        //     type,
        // }
        //dispatch(tradeActions.addUpdateRules(submitRule));
        // this.setState({ isAdd: false, stocks: [] });
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
                            <span className="input-group-text" id="basic-addon3">Label</span>
                        </div>
                        <input type="text" className="form-control required" name="heading" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Description</span>
                        </div>
                        <textarea className="form-control required" name="description" onChange={this.handleChange}></textarea>
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

const connectedAddNameSpacePage = connect(mapStateToProps)(CSSModules(AddNameSpace, styles));
export { connectedAddNameSpacePage as AddNameSpace }; 
