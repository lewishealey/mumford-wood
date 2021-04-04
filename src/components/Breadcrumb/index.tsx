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
        <div className="flex space-x-0.5 items-center justify-center mt-0.5 md:mt-1">
            {crumbs?.map((crumb,i)=>
            <>
               {crumbs.length == i+1 ? <div className="text-sm font-body font-bold capitalize" key={i}>{crumb.label}</div> : <Link href={crumb.link}>
                    <a className="hover:underline text-gray-600 text-sm font-body capitalize" key={i}>
                        {crumb.label}
                    </a>
                </Link>}
                {crumbs.length !== i+1 && <span className="items-center"><Image src={"/img/chevron.svg"} height={12} width={12} /></span> }
            </>
            )}
        </div>
    )
  }

  export default Breadcrumb;
