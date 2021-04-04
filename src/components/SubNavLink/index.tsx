import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavLinkProps {
    href: string;
    as?: string;
    children: string;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const SubNavLink: React.FC<NavLinkProps> = ({
    href,
    as,
    children
}) => {
    const { asPath } = useRouter();
    let activeClassName = "";
    if(asPath === href || asPath === as) {
        activeClassName = "border-gray-600";
        if(asPath.includes("conservation")) {
            activeClassName = "border-primary-base";
        }
        if(asPath.includes("heritage")) {
            activeClassName = "border-blood-base";
        }
        if(asPath.includes("classic")) {
            activeClassName = "border-royal-base";
        }
    } else {
        if(asPath.includes("conservation")) {
            activeClassName = "border-primary-fade";
        }
        if(asPath.includes("heritage")) {
            activeClassName = "border-blood-fade";
        }
        if(asPath.includes("classic")) {
            activeClassName = "border-royal-fade";
        }
    }

    return (
        <Link href={href}>
            <a className={`block ${activeClassName} border-solid border-b-4 py-0.75 hover:border-neutral-2 font-heading text-sm transition-all duration-500 ease-in-out`}>
                {children}
            </a>
      </Link>
    )
  }

  export default SubNavLink;
