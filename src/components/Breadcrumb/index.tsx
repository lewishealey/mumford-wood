import React from 'react';
import Link from 'next/link';
import Chevron from '../../icons/chevron.svg';

export const Breadcrumb: React.FC = ({
}) => {

    return (
        <div className="flex space-x-1">
            <Link href="/">
                <a className=''>
                    ver
                </a>
            </Link>
            <img src={Chevron} />
            <Link href="/">
                <a className=''>
                    ver
                </a>
            </Link>
            <img src={Chevron} />
            <Link href="/">
                <a className='font-medium'>
                    ver
                </a>
            </Link>
        </div>
    )
  }

  export default Breadcrumb;
