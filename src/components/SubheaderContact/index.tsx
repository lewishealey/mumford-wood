import React, { useState } from 'react';
import SubNavLink from '@components/SubNavLink';
import { useRouter } from 'next/router';
export interface Props {
}

export const SubheaderContact: React.FC<Props> = ({
}) => {
    const { asPath } = useRouter();
    let bgColour = "bg-gray-100";

    return (
        <div className={`w-full ${bgColour}`}>
                <div className="flex m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0 md:justify-center">
                    <SubNavLink href="/contact-us">Contact Us</SubNavLink>
                    <SubNavLink href="/sales-map">Sales Map</SubNavLink>
                </div>
            </div>
    )
  }

  export default SubheaderContact;
