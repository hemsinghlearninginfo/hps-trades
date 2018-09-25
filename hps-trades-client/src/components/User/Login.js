import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { NavLink } from 'reactstrap';

import styles from './User.css';
import Wrapper from '../../hoc/Wrapper';

class Login extends Component {
    
    render() {
        return (
            <Wrapper>
                <div className="user-form">
                    <form action="/examples/actions/confirmation.php" method="post">
                        <h2>Sign in</h2>
                        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                        </div>
                        <div class="clearfix">
                            <label class="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                            <a href="#" class="pull-right">Forgot Password?</a>
                        </div>
                        <div class="or-seperator"><i>or</i></div>
                        <p class="text-center">Don't have an account? <NavLink href="/register">Sign up here!</NavLink></p>
                    </form>
                </div>
            </Wrapper>
        )
    }
}

export default CSSModules(Login, styles);

