import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import { Login } from './User/Login';
import { Register } from './User/Register';
import { ForgotPassword } from './User/ForgotPassword';
import { ResetPassword } from './User/ResetPassword';
import UserPreference from './User/UserPreference';
import TNC from './Legal/TNC';
import PP  from './Legal/PP';

import loading from './Utils/loading';
import alert from './Utils/alert';
import ConfirmAlert from './Utils/confirmAlert';
import GoogleReCaptcha from './Utils/GoogleReCaptcha';
import { URLToken } from './URL/URLToken';

import logo from './Utils/logo';

import Event from './Event/events';

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
    static ForgotPassword = ForgotPassword;
    static ResetPassword = ResetPassword;

    static TNC = TNC;
    static PP = PP;
    static Loading = loading;
    static Alert = alert;
    static ConfirmAlert = ConfirmAlert;
    static GoogleReCaptcha = GoogleReCaptcha;
    static URLToken = URLToken;

    static Event = Event;

    static PageTemplate = pageTemplate;
    static Error404 = error404;
}
