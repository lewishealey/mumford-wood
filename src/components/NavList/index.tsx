import React from 'react';
import NavLink from 'src/components/NavLink';

export interface NavListProps {
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavList: React.FC<NavListProps> = ({
  }) => {
    return ( <div className={`w-full bg-primary-neutral md:bg-white`}>
                <div className="flex m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0 md:justify-center">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about-us">About Us</NavLink>
                    <NavLink href="/product-ranges">Product ranges</NavLink>
                    <NavLink href="/professional">Professional</NavLink>
                    <NavLink href="/case-studies">Case studies</NavLink>
                    <NavLink href="/news">News</NavLink>
                    <NavLink href="/contact-us">Contact us</NavLink>
                    <NavLink href="/download-brochure">Download Brochure</NavLink>

                    <div className="md:hidden mt-4">
                        <NavLink href="/request-estimate">Request an estimate</NavLink>
                        <NavLink href="/download-brochure">Download brochure</NavLink>
                    </div>
                </div>
            </div>
    )
  }

  export default NavList;
