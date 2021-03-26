import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export const ReCaptcha: React.FC = ({
}) => {
    function onChange(value) {
        console.log("Captcha value:", value);
      }
      //6LfnWZAaAAAAAJHSLDYO0lSAo5x_Q7wmgFREBPwT
       return <ReCAPTCHA
       sitekey="6LfnWZAaAAAAADOseIaAxTK4x66wKCVP_CSFvw11"
       onChange={onChange}
     />;
  }

  export default ReCaptcha;
