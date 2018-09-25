import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { NavLink } from 'reactstrap';

import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        //const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password) {
            //dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <Wrapper>
                <div className="user-form">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2>Register</h2>
                        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6 firstName">
                                <input type="text" className="form-control" name="firstName" placeholder="First Name" required="required" value={user.firstName} onChange={this.handleChange} />
                                    {
                                        submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className="col-xs-6 lastName"><input type="text" className="form-control" name="lastName" placeholder="Last Name" required="required" value={user.lastName} onChange={this.handleChange} />
                                    {
                                        submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" required="required" value={user.email} onChange={this.handleChange} />
                            {
                                submitted && !user.email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" required="required" value={user.password} onChange={this.handleChange} />
                            {
                                submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
                        </div>
                        <div className="form-group">
                            <label className="checkbox-inline"><input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
                        </div>
                        <div className="text-center">Already have an account? <NavLink href="/login">Sign in!</NavLink></div>
                    </form>
                </div>

            </Wrapper>
        )
    }
}

export default CSSModules(Register, styles);

