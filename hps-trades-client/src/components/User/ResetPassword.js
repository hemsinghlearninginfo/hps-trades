import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import { messageConstants } from '../../_constants';
import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';
import { validateEmail } from '../../_helpers';

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            googleReCaptchaValue: '',
            submitted: false,
            successSend: false,
            isValidEmail: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeReCaptcha = this.handleChangeReCaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, googleReCaptchaValue } = this.state;
        const { dispatch } = this.props;
        let isValidEmail = validateEmail(username);

        this.setState({
            isValidEmail
        });
        if (username && isValidEmail && googleReCaptchaValue) {
            var forgotPasswordToEmail = {
                username
            }
            dispatch(userActions.forgotPasswordToEmail(forgotPasswordToEmail));
            this.setState({ successSend: true });
        }
    }

    handleChangeReCaptcha = (value) => {
        this.setState({ googleReCaptchaValue: value });
        return new Promise(function (resolve, reject) {
            resolve();
        });
    }

    render() {
        const { forgotpasswording } = this.props;
        const { username, googleReCaptchaValue, submitted, isValidEmail, successSend } = this.state;
        return (
            <Wrapper>
                {successSend &&
                    <Components.Alert type="alert-success" message={messageConstants.FORGOTPASSWORD_REQUEST_SEND} />
                }
                <div className="user-form">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2 className="fpwd">Forgot Password?</h2>
                        <p className="hint-text">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                        <div className="form-group">
                            <input type="text" className="form-control" name="username" value={username}
                                onChange={this.handleChange} placeholder="example@domain.com" autoComplete="false" />
                            {   
                                (submitted && !username &&
                                <div className="help-block">Email is required</div>)
                                || (submitted && !isValidEmail &&
                                <div className="help-block">Email is not in proper format</div>)
                            }
                        </div>
                        <div className="form-group recaptcha">
                            <Components.GoogleReCaptcha googleReCaptcha={googleReCaptchaValue}
                                reCaptchanChange={this.handleChangeReCaptcha} />
                            {submitted && !googleReCaptchaValue &&
                                <div className="help-block">Please validate captcha</div>
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
            </Wrapper>
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