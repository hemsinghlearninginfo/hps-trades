import React, { Component } from "react";
import { connect } from 'react-redux';

import { utils } from '../../_helpers';
import Components from '../index';
import { emailActions } from '../../_actions';

class URLToken extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRequestPost: false
    }

  }

  componentDidMount() {
    const { isRequestPost } = this.state;
    if (!isRequestPost) {
      const { dispatch } = this.props;
      var queryString = utils.getQueryString(this.props, 'url');
      dispatch(emailActions.isURLValidate(queryString));
      this.setState({ isRequestPost: true });
    }
  }

  render() {
    const { isRequestPost } = this.state;
    const { requestLoading } = this.props;
    return (
      <div>
        {(!isRequestPost || requestLoading) && <Components.Loading isDropper={true} message='Loading' />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requestLoading } = state.emails;
  return {
    requestLoading
  };
}


const connectedURLTokenPage = connect(mapStateToProps)(URLToken);
export { connectedURLTokenPage as URLToken }; 