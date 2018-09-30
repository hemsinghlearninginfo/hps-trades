import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import { myConfigLabels } from '../../config';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isUserLogin: false
        };
    }

    // componentWillMount() {
    //     this.props.dispatch(userActions.getAll());
    // }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let userLoginHTML;
        if (this.state.isUserLogin) {
            userLoginHTML = (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hello HS
                    </DropdownToggle>
                    <DropdownMenu right className="dropDownMenu">
                        <DropdownItem className="item">
                            Preference
                    </DropdownItem>
                        <DropdownItem className="item">
                            Option 2
                    </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="item" href="/login">
                            Logout
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
        else {
            userLoginHTML = (
                <NavItem>
                    <NavLink href="/login">{myConfigLabels.LoginLink}</NavLink>
                </NavItem>
            );
        }
        return (
            <div>
                <Navbar className="changeHeader" color="light" light expand="md">
                    <NavbarBrand href="/">{myConfigLabels.AppName}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem>
                                <NavLink href="#">Current Status</NavLink>
                            </NavItem>
                            <li className="menuHorzintalDivider"></li>
                            <NavItem>
                                <NavLink href="#">My</NavLink>
                            </NavItem>
                            <li className="menuHorzintalDivider"></li>
                            <NavItem>
                                <NavLink href="#" className="topLinks">System</NavLink>
                            </NavItem>
                            <li className="menuHorzintalDivider"></li> */}
                            {userLoginHTML}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHeader = connect(mapStateToProps)(CSSModules(Header, styles));
export { connectedHeader as Header };