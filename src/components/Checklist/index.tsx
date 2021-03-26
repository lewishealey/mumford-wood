import React, { useState } from 'react';
import IconCircle from '@components/IconCircle';

export interface DialogProps {
    label: string;
}

export const Checklist: React.FC<DialogProps> = ({
    label
}) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="flex items-center space-x-0.5">
            <input type="checkbox" id="scales" name="scales" checked={isChecked} onClick={() => setIsChecked(!isChecked)}/>
            <label htmlFor="scales">{label}</label>
        </div>
    )
  }

  export default Checklist;
