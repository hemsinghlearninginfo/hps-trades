import React, { Component } from "react";
import { getQueryString } from '../../_helpers';
import Components from '../index';

class URLToken extends Component {

  componentDidMount(){
    var queryString = getQueryString(this.props, 'url');
  }

  render() {
    return (
      <div>
        <Components.Loading isDropper={true} message='Loading' />
      </div>
    );
  }
}

export default URLToken;
