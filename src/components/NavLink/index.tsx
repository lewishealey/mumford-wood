import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageContext from '@utils/contexts.js';

export interface NavLinkProps {
    href: string;
    as?: string;
    children: string;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavLink: React.FC<NavLinkProps> = ({
    href,
    as,
    children
}) => {
    const { asPath } = useRouter();
    const slug = useContext(PageContext)
    let activeClassName = "";
    if(asPath === href || asPath === as || href == `/${slug}`) {
        activeClassName = "border-dark";
    } else {
        activeClassName = "md:border-white";
    }

    return (
        <Link href={href}>
            <a className={`block ${activeClassName} border-solid border-b-2 md:border-b-4 py-0.5 mt-0.5 md:mt-0 md:py-0.75 hover:border-neutral-2 font-heading text-xl md:text-base transition-all duration-500 ease-in-out`}>
                {children}
            </a>
      </Link>
    )
  }

  export default NavLink;
