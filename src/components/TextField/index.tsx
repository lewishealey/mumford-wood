import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export interface Props {
    type: string;
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    size?: 'default' | 'compact';
    onTyped?: (e) => void;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const TextField: React.FC<Props> = ({
    type,
    label,
    name,
    placeholder,
    required,
    value,
    size,
    onTyped,
}) => {
    let buttonStyle;
    let buttonSize;

    switch(size) {
        case 'default':
            buttonSize = 'h-2.5 px-1';
        break;
        case 'compact':
            buttonSize = 'h-2 px-0.75';
        break;
    }

    const classes = classNames(`TextField`, `TextField--size-${size}`,`relative w-full flex rounded font-heading text-md items-center`, buttonStyle, buttonSize);

    return (
        <div className="TextField__group w-full">
            {label && <label className="relative flex rounded font-heading text-md items-center mb-0.25">{label}</label>}
            <input type={type} className={classes} name={name} value={value} placeholder={placeholder} required={required} onKeyDown={onTyped} />
        </div>
    )
  }

  export default TextField;

  TextField.defaultProps = {
      type: 'text',
      size: 'default',
      placeholder: 'Enter here'
  }
