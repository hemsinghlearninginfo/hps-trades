import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { NavLink } from 'reactstrap';

import styles from './Register.css';
import Aux from '../../hoc/Aux';
import Components from '../index';

class Register extends Component {
    render() {
        return (
            <Aux>
                <div className="signup-form">
                    <form action="/examples/actions/confirmation.php" method="post">
                        <h2>Register</h2>
                        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6 firstName"><input type="text" className="form-control" name="first_name" placeholder="First Name" required="required" /></div>
                                <div className="col-xs-6 lastName"><input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" /></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
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

            </Aux>
        )
    }
}

export default CSSModules(Register, styles);

