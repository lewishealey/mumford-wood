import React from 'react';
import IconCircle from '../../../src/components/IconCircle';

export interface DialogProps {
    children: string;
    success: boolean;
    error: boolean;
    title: string;
}

export const Dialog: React.FC<DialogProps> = ({
    success,
    error,
    title,
    children
}) => {
    return (
        <div className="bg-white rounded-md shadow text-center justify-center p-2 w-28 border-t-4 border-primary-base border-solid">
            <div className="m-auto flex justify-center mb-1">
                {success && <IconCircle size={4} style="success"/>}
                {error && <IconCircle size={4} style="error"/>}
            </div>
            <h4 className="text-2xl font-heading">{title}</h4>
            <div className="">
                {children}
            </div>
        </div>
    )
  }

  export default Dialog;
