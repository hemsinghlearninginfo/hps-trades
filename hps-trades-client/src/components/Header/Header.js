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
import { FaUserSecret, FaSignOutAlt, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { myConfigLabels } from '../../config';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const user = this.props.authentication.user;
        let userLoginHTML;

        if (user == null || user.token==null) {
            userLoginHTML = (
                <NavItem>
                    <NavLink href="/login"><FaSignInAlt />Login</NavLink>
                </NavItem>
            );
        }
        else {
            userLoginHTML = (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <FaUserAlt />Hello {user.firstName}
                    </DropdownToggle>
                    <DropdownMenu right className="dropDownMenu">
                        <DropdownItem className="item" href="/userpreference">
                            <FaUserSecret />Preference
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="item" href="/login">
                            <FaSignOutAlt />Log Out
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
        
        return (
            <div>
                <Navbar className="changeHeader" color="light" light expand="md">
                    <NavbarBrand href="/">{myConfigLabels.AppName}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
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
    return {
        authentication
    };
}

const connectedHeader = connect(mapStateToProps)(CSSModules(Header, styles));
export { connectedHeader as Header };


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
