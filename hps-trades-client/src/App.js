import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect} from 'react-redux';

import Aux from './hoc/Aux';
import Components from './components';
import { alertActions } from './_actions';
import { history } from './_helpers';
import { PrivateRoute } from './components/Routes/PrivateRoutes';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Aux>
        <Components.Layout>
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={Components.Home} />
              <Route exact path="/login" component={Components.Login} />
              <Route exact path="/register" component={Components.Register} />
            </div>
          </Router>
        </Components.Layout>
      </Aux>
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
