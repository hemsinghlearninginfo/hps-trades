import React, { Component } from 'react';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import { NavLink } from 'reactstrap';

import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';
import { userActions } from '../../_actions';
import Components from '../index';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: '',
                isAccept: false
            },
            submitted: false,
            passwordNotMatched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleCheckBox(event) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                isAccept: event.target.checked
            }
        });
    }

    getFinalObjectToSubmit = (user) => {
        return ({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        this.setState({ passwordNotMatched: (user.password === user.confirmPassword) });
        if (user.firstName && user.lastName && user.username 
            && user.password && user.confirmPassword 
            && user.isAccept && (user.password === user.confirmPassword)) {
            let submitUser = this.getFinalObjectToSubmit(user);
            dispatch(userActions.register(submitUser));
        }
    }

    
    render() {
        const { registering } = this.props;
        const { user, submitted, passwordNotMatched } = this.state;
        return (
            <Wrapper>
                <div className="user-form">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2>Register</h2>
                        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6 firstName">
                                    <input type="text" className="form-control required" name="firstName"
                                        placeholder="First Name" value={user.firstName} onChange={this.handleChange} />
                                    {
                                        submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className="col-xs-6 lastName">
                                    <input type="text" className="form-control required" name="lastName"
                                        placeholder="Last Name" value={user.lastName} onChange={this.handleChange} />
                                    {
                                        submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control required" name="username"
                                placeholder="Email" value={user.username} onChange={this.handleChange} />
                            {
                                submitted && !user.username &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control required" name="password"
                                placeholder="Password" value={user.password} onChange={this.handleChange} />
                            {
                                submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control required" name="confirmPassword"
                                placeholder="Confirm Password" value={user.confirmPassword} onChange={this.handleChange} />
                            {
                                (submitted && !user.confirmPassword &&
                                    <div className="help-block">Confirm Password is required</div>)
                                || (submitted && !passwordNotMatched &&
                                    <div className="help-block">Confirm Password should be matched with password</div>)
                            }
                        </div>
                        <div className="form-group">
                            <label className="checkbox-inline">
                                <input name="isAccept" type="checkbox" defaultChecked={user.isAccept} onChange={this.handleCheckBox} /> I accept the <a href="/tnc" target="_blank">Terms of Use</a> &amp; <a href="/pp" target="_blank">Privacy Policy</a>
                            </label>
                            {
                                submitted && !user.isAccept &&
                                <div className="help-block">Please click on accept conditions</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
                        </div>

<Components.Loading message='Working' />
                        {registering && <Components.Loading message='Working' />}
                        <div className="text-center">Already have an account? <NavLink href="/login">Sign in!</NavLink></div>
                    </form>
                </div>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(CSSModules(Register, styles));
export { connectedRegisterPage as Register };