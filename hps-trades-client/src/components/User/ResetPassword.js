import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import { messageConstants } from '../../_constants';
import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';
import { utils } from '../../_helpers';
import { iconConstants } from '../../_constants';
import { getIcon } from '../../_helpers/';

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            password: '',
            confirmPassword: '',
            submitted: false,
            successUpdate: false,
            isValidURL: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        var queryString = utils.getQueryString(this.props, 'token');
        console.log('queryString : ', queryString);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { password, confirmPassword } = this.state;
        //const { dispatch } = this.props;

        if (password && confirmPassword) {
            // var forgotPasswordToEmail = {
            //     username
            // }
            // dispatch(userActions.forgotPasswordToEmail(forgotPasswordToEmail));
            //this.setState({ successSend: true });
        }
    }

    render() {
        const { forgotpasswording } = this.props;
        const { password, confirmPassword, submitted, successUpdate, isValidURL } = this.state;
        return (
            (isValidURL ?
                <Wrapper>
                    {successUpdate &&
                        <Components.Alert type="alert-success" message={messageConstants.FORGOTPASSWORD_REQUEST_SEND} />
                    }
                    <div className="user-form">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <h2 className="resetpwd">Reset Password?</h2>
                            <p className="hint-text">Please choose a new password to update existing password.</p>
                            <div className="form-group">
                                <input type="password" className="form-control" name="username" value={password}
                                    onChange={this.handleChange} placeholder="Password" autoComplete="false" />
                                {
                                    (submitted && !password &&
                                        <div className="help-block">Password is required</div>)
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="username" value={confirmPassword}
                                    onChange={this.handleChange} placeholder="Confirm Password" autoComplete="false" />
                                {
                                    (submitted && !confirmPassword &&
                                        <div className="help-block">Confirm Password is required</div>)
                                }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Reset my password</button>
                            </div>
                            {forgotpasswording && <Components.Loading message='Email' />}
                            <div className="text-center">
                                <a className="center" href="/login">"I remember Login Details"</a>
                            </div>
                        </form>
                    </div>
                </Wrapper> :
                <Wrapper>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert alert-danger" role="alert">
                                <div className="row vertical-align">
                                    <div className="col-xs-1 text-center">
                                        {getIcon(iconConstants.ERROR)}
                                    </div>
                                    <div className="col-xs-11">
                                        <div><strong>There was a problem with your request</strong></div>
                                        <div>There was an error with you request link. Please try again.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>)
        )
    }
}

function mapStateToProps(state) {
    const { forgotpasswording } = state.forgotpasswordToEmail;
    return {
        forgotpasswording
    };
}

const connectedResetPasswordPage = connect(mapStateToProps)(CSSModules(ResetPassword, styles));
export { connectedResetPasswordPage as ResetPassword }; 