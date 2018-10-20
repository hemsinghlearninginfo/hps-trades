import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LePfHUUAAAAAGuploGoYDiqKn_CcNmCbFjqMN4Q";

class GoogleReCaptcha extends React.Component {

  constructor(props) {
    super(props);
    this._reCaptchaRef = React.createRef();
  }

  render() {
    return (
      <div className="recaptcha">
        <ReCAPTCHA
          ref={this._reCaptchaRef}
          style={{ display: "inline-block" }}
          sitekey={SITE_KEY}
          onChange={this.props.reCaptchanChange}
        />
      </div>
    );
  }
}

export default GoogleReCaptcha;
