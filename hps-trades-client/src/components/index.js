import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import { Login } from './User/Login';
import { Register } from './User/Register';
import UserPreference from './User/UserPreference';
import TNC from './Legal/TNC';
import PP  from './Legal/PP';

import loading from './Utils/loading';
import alert from './Utils/alert';
import ConfirmAlert from './Utils/confirmAlert';

import logo from './Utils/logo';

import Event from './Event/events';
import MarketClose from './Event/marketClose';

import error404 from './Error/404';

import pageTemplate from './Template/PageTemplate';

export default class Component {

    static Logo = logo;
    static Footer = Footer;
    static Header = Header;
    static Layout = Layout;
    static Home = Home;

    static Login = Login;
    static Register = Register;
    static UserPreference = UserPreference;

    static TNC = TNC;
    static PP = PP;
    static Loading = loading;
    static Alert = alert;
    static ConfirmAlert = ConfirmAlert;

    static Event = Event;
    static MarketClose = MarketClose;

    static PageTemplate = pageTemplate;
    static Error404 = error404;
}
