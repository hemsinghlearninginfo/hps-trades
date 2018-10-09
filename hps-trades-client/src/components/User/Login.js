import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';

import Components from '../index';
import { userActions } from '../../_actions';
import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';

class Login extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Wrapper>
                <div className="user-form">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2>Sign in</h2>
                        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                        <div className="form-group">
                            <input type="email" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                        </div>
                        { loggingIn && <Components.Loading message="searching" /> }
                        <div className="text-center">
                            {/* <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label> */}
                            <a className="center">Forgot Password?</a>
                        </div>
                        <div className="or-seperator"><i>or</i></div>
                        <p className="text-center">Don't have an account? <NavLink href="/register">Sign up here!</NavLink></p>
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

const connectedLoginPage = connect(mapStateToProps)(CSSModules(Login, styles));
export { connectedLoginPage as Login }; 