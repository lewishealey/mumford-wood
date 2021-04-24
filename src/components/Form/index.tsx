import React, { useCallback } from 'react';
import Newsletter from './newsletter';
import DownloadBrochure from './download-brochure';
import Apprenticeship from './apprenticeship';
import RequestEstimate from './request-estimate';

type types = 'brochure' | 'apprenticeship' | 'estimate' | 'newsletter';
type Props = {
    type: types | any;
    cta?: boolean;
    inputs?: boolean;
}

export const Form: React.FC<Props> = ({
    type,
    inputs,
    cta,
}) => {
    let form;


    switch(type) {
        case 'brochure' :
            form = <DownloadBrochure inputs={inputs} cta={cta}/>;
            break;
        case 'apprenticeship' :
            form = <Apprenticeship inputs={inputs} cta={cta}/>;
            break;
        case 'estimate' :
            form = <RequestEstimate inputs={inputs} cta={cta}/>;
            break;
        case 'newsletter' :
            form = <Newsletter />;
            break;
    }
    return form;
  }

  export default Form;
