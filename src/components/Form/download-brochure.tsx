import React from 'react';
import TextField from '@components/TextField';
import Button from '@components/Button';
import ReCaptcha from '@components/ReCaptcha';
import Checklist from '@components/Checklist';

export const DownloadBrochure: React.FC = ({

}) => {
    return <div className="space-y-1">
        <div>
            <h3 className="font-heading text-2xl color-gray">Download a brochure</h3>
            <p className="font-body text-md text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt felis. Aenean consectetur ligula lectus, pharetra fermentum lectus rutrum id.</p>
        </div>
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
    <Checklist label="I would like to receive more information by email"/>
    <Button
        size="default"
        style="primary"
        >
        Request estimate
    </Button>
    </div>;
  }

  export default DownloadBrochure;
