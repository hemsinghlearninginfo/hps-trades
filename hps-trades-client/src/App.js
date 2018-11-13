import React, { Component } from 'react';
import { Router, Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";


import Wrapper from './hoc/Wrapper';
import Components from './components';
import { alertActions } from './_actions';
import { history } from './_helpers';
import { PrivateRoute } from './components/Routes/PrivateRoutes';
import './assets/css/App.css';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.state = {
      response: false,
      endpoint: 'http://localhost:4000/'
    };

  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => console.log(data));
  }

  render() {

    const { alert } = this.props;
    
    return (
      <Wrapper>
        <HashRouter>
          <Components.Layout>
            <div className="topSpacer">{' '}</div>
            <Components.Alert type={alert.type} message={alert.message} />
            {/* <Components.MarketClose /> */}
            <Router history={history}>
              <Switch>
                {/* <PrivateRoute exact path="/" component={Components.Home} /> */}
                <PrivateRoute exact path="/userpreference" component={Components.UserPreference} />
                <Route exact path="/" component={Components.Home} />
                <Route exact path="/tkn" component={Components.URLToken} />
                <Route exact path="/fpwd" component={Components.ForgotPassword} />
                {/* <Route exact path="/resetpwd" component={Components.ResetPassword} /> */}
                <Route exact path="/event" component={Components.Events} />
                <Route exact path="/tnc" component={Components.TNC} />
                <Route exact path="/pp" component={Components.PP} />
                <Route exact path="/login" component={Components.Login} />
                <Route exact path="/register" component={Components.Register} />
                <Route path='/404' component={Components.Error404} />
                <Redirect path='*' to='/404' />
              </Switch>
            </Router>
          </Components.Layout>
        </HashRouter>
      </Wrapper>
    );
  }
  
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
