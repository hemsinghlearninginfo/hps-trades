import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';
import GoogleReCaptcha from '../Utils/GoogleReCaptcha';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            googleReCaptchaValue: '',
            submitted: false
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
        if (username && googleReCaptchaValue) {
            //dispatch(userActions.login(username));
        }
    }

    handleChangeReCaptcha = (value) => {
        this.setState({ googleReCaptchaValue: value });
        return new Promise(function (resolve, reject) {
            resolve();
        });
    }

    render() {
        const { loggingIn } = this.props;
        const { username, googleReCaptchaValue, submitted } = this.state;
        return (
            <Wrapper>
                <div className="user-form">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2 className="fpwd">Forgot Password?</h2>
                        <p className="hint-text">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                        <div className="form-group">
                            <input type="email" className="form-control" name="username" value={username}
                                onChange={this.handleChange} placeholder="example@domain.com" autoComplete="false" />
                            {submitted && !username &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className="form-group recaptcha">
                            <GoogleReCaptcha googleReCaptcha={googleReCaptchaValue}
                                reCaptchanChange={this.handleChangeReCaptcha} />
                            {submitted && !googleReCaptchaValue &&
                                <div className="help-block">Please validate captcha</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Reset my password</button>
                        </div>
                        {loggingIn && <Components.Loading message="searching" />}
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
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedForgotPasswordPage = connect(mapStateToProps)(CSSModules(ForgotPassword, styles));
export { connectedForgotPasswordPage as ForgotPassword }; 