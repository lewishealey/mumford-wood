import React from 'react';
import Link from 'next/link';

type styles = 'neutral' | 'classic' | 'heritage' | 'conservation';
type Props = {
    style: styles;
}

export const Box: React.FC<Props> = ({
    style,
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
        </div>
    )
  }

  export default Box;
