import React from 'react';
import NavLink from '@components/NavLink';

export interface NavListProps {
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavList: React.FC<NavListProps> = ({
  }) => {
    return ( <div className={`w-full bg-white`}>
                <div className="container flex m-auto gap-2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/product-range">Product range</NavLink>
                    <NavLink href="/professional">Professional</NavLink>
                    <NavLink href="/case-studies">Case studies</NavLink>
                    <NavLink href="/news">News</NavLink>
                    <NavLink href="/contact-us">Contact us</NavLink>
                </div>
            </div>
    )
  }

  export default NavList;
