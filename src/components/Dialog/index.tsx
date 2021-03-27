import React from 'react';
import IconCircle from '@components/IconCircle';

export interface DialogProps {
    children: any;
    success?: boolean;
    error?: boolean;
    title?: string;
    summary?: string;
}

export const Dialog: React.FC<DialogProps> = ({
    success,
    error,
    title,
    summary,
    children
}) => {
    return (
        <div className="bg-white rounded-md shadow text-center justify-center p-2 w-28 border-t-4 border-primary-base border-solid">
            {success || error &&
            <div className="m-auto flex justify-center mb-1">
                {success && <IconCircle size={3} style="success"/>}
                {error && <IconCircle size={3} style="error"/>}
            </div>
}
            {title && <h4 className="text-2xl font-heading mb-1">{title}</h4>}
            {summary && <p className="text-base font-body mb-1 text-neutral-1">{summary}</p>}
            <div className="">
                {children}
            </div>
        </div>
    )
  }

  export default Dialog;
