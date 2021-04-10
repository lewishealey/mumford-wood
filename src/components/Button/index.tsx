import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export interface Props {
    href?: string;
    title?: string;
    style: string;
    size: 'default' | 'compact';
    children?: string;
    onClick?: () => void;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Button: React.FC<Props> = ({
    href,
    title,
    style,
    size,
    children,
    onClick,
}) => {
    let buttonStyle;
    let buttonSize;

    switch(size) {
        case 'default':
            buttonSize = 'h-2.5 px-1';
        break;
        case 'compact':
            buttonSize = 'h-2 px-0.5';
        break;
    }

    switch(style) {
        case 'primary':
            buttonStyle = 'bg-primary-base hover:bg-primary-hover text-white';
        break;
        case 'secondary':
            buttonStyle = 'bg-neutral-0 hover:bg-neutral-3 text-white';
        break;
        case 'fade':
            buttonStyle = 'bg-neutral-4 hover:bg-neutral-3 text-neutral-1';
        break;
        case 'ghost':
            buttonStyle = 'bg-neutral-5 hover:bg-neutral-4 text-neutral-1';
        break;
    }

    const classes = classNames(`w-full text-center justify-center relative flex rounded font-heading text-md items-center`, buttonStyle, buttonSize);

    if(href) {
        return (
            <Link href={href}>
                <button className={classes} title={title}>
                    {children}
                </button>
          </Link>
        )
    } else {
        return (
            <button type="submit" className={classes} title={title} onClick={onClick}>
                {children}
            </button>
        )
    }
  }

  export default Button;
