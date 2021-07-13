import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type CrumbItem = {
    link?: string;
    label: string;
}

type Props = {
    crumbs: CrumbItem[];
}
export const Breadcrumb: React.FC<Props> = ({
    crumbs
}) => {
    return (
        <div className="space-x-0.5 items-center justify-center mt-0.5 md:mt-1 flex">
            {crumbs?.map((crumb,i)=>
            <span key={i} className="flex items-center">
               {crumbs.length == i+1 ? <div className="text-sm font-body capitalize items-center leading-none truncate">{crumb.label}</div> : <Link href={crumb.link}>
                    <a className="hover:underline text-gray-600 text-sm font-body capitalize leading-none truncate">
                        {crumb.label}
                    </a>
                </Link>}
                {crumbs.length !== i+1 && <span className="items-center ml-0.5"><Image src={"/img/chevron.svg"} height={12} width={12} /></span> }
            </span>
            )}
        </div>
    )
  }

  export default Breadcrumb;
