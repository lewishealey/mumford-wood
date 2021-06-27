import React from 'react';
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3';

export const ReCaptcha: React.FC = ({
}) => {
    function onChange(value) {
        // console.log("Captcha value:", value);
    }

     return <GoogleReCaptcha onVerify={onChange} />
  }

  export default ReCaptcha;
