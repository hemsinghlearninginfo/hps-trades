import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import { Login } from './User/Login';
import { Register } from './User/Register';
import TNC from './Legal/TNC';
import PP from './Legal/PP';
import loading from './Utils/loading';
import alert from './Utils/alert';

export default class Component {

    static Footer = Footer;
    static Header = Header;
    static Layout = Layout;
    static Home = Home;

    static Login = Login;
    static Register = Register;

    static TNC = TNC;
    static PP = PP;
    static Loading = loading;
    static Alert = alert;
}
