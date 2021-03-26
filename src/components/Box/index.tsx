import React from 'react';
import Link from 'next/link';
import Chevron from '../../icons/chevron.svg';
const IconSVG = require(`@icon/chevron.svg`);

type styles = 'neutral' | 'classic' | 'heritage' | 'conservation';
type Props = {
    style: styles;
    title: string;
    summary: string;
}

export const Box: React.FC<Props> = ({
    style,
    title,
    summary
}) => {
    let bgColor = 'bg-neutral-4';

    switch(style) {
        case 'conservation' :
            bgColor = 'bg-primary-fade';
            break;
        case 'classic' :
            bgColor = 'bg-royal-fade';
            break;
        case 'heritage' :
            bgColor = 'bg-blood-fade';
            break;
    }

    return (
        <div className={`flex flex-col space-y-0.5 p-1.5 rounded-lg ${bgColor}`}>
            {title && <h3 className="font-heading text-2xl color-gray">{title}</h3>}
            {summary && <p className="font-body text-md">{summary}</p>}
        </div>
    )
  }

  export default Box;
