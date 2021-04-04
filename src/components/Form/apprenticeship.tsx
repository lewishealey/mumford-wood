import React from 'react';
import TextField from '@components/TextField';
import Button from '@components/Button';
import ReCaptcha from '@components/ReCaptcha';

export const Apprenticeship: React.FC = ({

}) => {

    return <div className="space-y-1">
            <div>
                <h3 className="font-heading text-2xl color-gray">Apply for apprenticeship</h3>
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
        type="date"
        label="Date of birth*"
        name="date"
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
        label="Address*"
        name="address"
    />
    <TextField
        type="text"
        label="Name of careers advisor*"
        name="careers_advisor"
    />
    <TextField
        type="text"
        label="Tel of careers advisor*"
        name="careers_advisor_tel"
    />
    <TextField
        type="text"
        label="Tell us what you would like to do at Mumford & Wood *"
        name="notes"
    />
    <ReCaptcha />
    <Button
        size="default"
        style="primary"
        >
        Request estimate
    </Button>
    </div>;
  }

  export default Apprenticeship;