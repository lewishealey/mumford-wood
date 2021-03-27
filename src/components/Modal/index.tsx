import React from 'react';
import Overlay from '@components/Overlay'

export interface NavLinkProps {
    children: any
}

export const NavLink: React.FC<NavLinkProps> = ({
    children
}) => {
    return (
        <div className="fixed top-0 left-0 h-full w-full">
            <div className="absolute top-0 left-0 h-full w-full flex z-10 justify-center items-center">
                {children}
            </div>
            <Overlay />
        </div>
    )
  }

  export default NavLink;
