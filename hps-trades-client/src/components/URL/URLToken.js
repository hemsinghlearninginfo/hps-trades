import React, { Component } from "react";
import { connect } from 'react-redux';

import { getQueryString } from '../../_helpers';
import Components from '../index';
import { utilActions } from '../../_actions';

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
      var queryString = getQueryString(this.props, 'url');
      dispatch(utilActions.isURLValidate(queryString));
      this.setState({ isRequestPost: true });
    }
  }

  render() {
    const { isRequestPost } = this.state;
    return (
      <div>
        {!isRequestPost && <Components.Loading isDropper={true} message='Loading' />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { utilLoading } = state.util;
  return {
    utilLoading
  };
}


const connectedURLTokenPage = connect(mapStateToProps)(URLToken);
export { connectedURLTokenPage as URLToken }; 