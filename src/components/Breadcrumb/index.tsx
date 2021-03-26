import React from 'react';
import Link from 'next/link';
import Chevron from '../../icons/chevron.svg';
const IconSVG = require(`@icon/chevron.svg`);

type CrumbItem = {
    link: string;
    label: string;
}

type Props = {
    crumbs: CrumbItem[];
}
export const Breadcrumb: React.FC<Props> = ({
    crumbs
}) => {
    return (
        <div className="flex space-x-0.5 items-center">
            {crumbs?.map((crumb,i)=>
            <>
               {crumbs.length == i+1 ? <div className="font-medium">{crumb.label}</div> : <Link href={crumb.link}>
                    <a className="hover:underline color-yellow">
                        {crumb.label}
                    </a>
                </Link>}
                {crumbs.length !== i+1 && <IconSVG.ReactComponent /> }
            </>
            )}
        </div>
    )
  }

  export default Breadcrumb;
