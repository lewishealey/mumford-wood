import React, { useState } from 'react';
import SubNavLink from '@components/SubNavLink';
import { useRouter } from 'next/router';
export interface Props {
}

export const SubheaderRange: React.FC<Props> = ({
}) => {
    const { asPath } = useRouter();
    let bgColour = "";

    switch(asPath) {
        case "/product-ranges/conservation-range" :
            bgColour = "bg-primary-fade";
        break;
        case "/product-ranges/classic-range" :
            bgColour = "bg-royal-fade";
        break;
        case "/product-ranges/heritage-range" :
            bgColour = "bg-blood-fade";
        break;
    }

    return (
        <div className={`w-full ${bgColour}`}>
                <div className="flex m-auto flex-row gap-1 md:gap-2 px-0 justify-center">
                    <SubNavLink href="/product-ranges/conservation-range">Conservation Range</SubNavLink>
                    <SubNavLink href="/product-ranges/classic-range">Classic Range</SubNavLink>
                    <SubNavLink href="/product-ranges/heritage-range">Heritage Range</SubNavLink>
                </div>
            </div>
    )
  }

  export default SubheaderRange;
