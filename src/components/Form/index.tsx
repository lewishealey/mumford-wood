import React from 'react';
import Link from 'next/link';
import DownloadBrochure from './download-brochure';
import Apprenticeship from './apprenticeship';
import RequestEstimate from './request-estimate';

type types = 'brochure' | 'apprenticeship' | 'estimate';
type Props = {
    type: types | any;
}

export const Form: React.FC<Props> = ({
    type
}) => {
    let form;

    switch(type) {
        case 'brochure' :
            form = <DownloadBrochure />;
            break;
        case 'apprenticeship' :
            form = <Apprenticeship />;
            break;
        case 'estimate' :
            form = <RequestEstimate />;
            break;
    }

    return form;
  }

  export default Form;
