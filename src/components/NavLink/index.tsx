import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export interface NavLinkProps {
    href: string,
    as: string,
    link: string,
    children: string
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavLink: React.FC<NavLinkProps> = ({
    href,
    as,
    children
}) => {
    const { asPath } = useRouter();
    let activeClassName = "";
    console.log(asPath,href)
    if(asPath === href || asPath === as) {
        activeClassName = "border-dark";
    } else {
        activeClassName = "md:border-white";
    }

    return (
        <Link href={href}>
            <a className={`block ${activeClassName} border-solid border-b-4 py-1 hover:border-neutral-2 font-heading text-base transition-all duration-500 ease-in-out`}>
                {children}
            </a>
      </Link>
    )
  }

  export default NavLink;
