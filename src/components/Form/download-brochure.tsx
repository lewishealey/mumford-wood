import React from 'react';
import TextField from '@components/TextField';
import Button from '@components/Button';
import ReCaptcha from '@components/ReCaptcha';
import Checkbox from '@components/Checkbox';

export const DownloadBrochure: React.FC = ({

}) => {
    return <div className="space-y-1">
    <TextField
        type="text"
        label="First name*"
        name="first_name"
    />
    <TextField
        type="text"
        label="Last name*"
        name="last_name"
    />
    <TextField
        type="email"
        label="Email address*"
        name="email"
    />
    <TextField
        type="text"
        label="Phone number*"
        name="phone"
    />
    <TextField
        type="text"
        label="Postcode*"
        name="post_code"
    />
    <TextField
        type="text"
        label="What profession are you?"
        name="profession"
    />
    <ReCaptcha />
    <Checkbox id="information" name="info" label="I would like to receive more information by email" onChecked={() => console.log("Agree")}/>
    <Button
        size="default"
        style="primary"
        >
        Request estimate
    </Button>
    </div>;
  }

  export default DownloadBrochure;
