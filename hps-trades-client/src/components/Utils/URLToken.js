import React from "react";
import { getQueryString } from '../../_helpers';

class URLToken extends React.Component {

  constructor(props) {
    super(props);
    var queryString = getQueryString(this.props, 'url');
    console.log('queryString : ', queryString);
  }

  render() {
    return (
      <div>
        url
      </div>
    );
  }
}

export default URLToken;
