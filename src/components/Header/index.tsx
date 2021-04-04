import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavList from '@components/NavList';
export interface HeaderProps {

}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Header: React.FC<HeaderProps> = ({
  }) => {
    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <>
        <div className="hidden md:flex bg-neutral-0 w-full text-center justify-between content-center items-center flex-row pt-0.5 -mb-0.5 px-2 hidden">
            <div className="flex-1 text-left">
                <img src="/img/made-in-britain-white.svg" alt="Made in Britain" className="h-3"/>
            </div>
            <Link href="/">
                <div className="flex items-bottom bottom-0">
                    <Image src="/img/Emblem.svg" width={64} height={71} alt="Emblem" />
                </div>
            </Link>
            <div className="flex-1 text-right">
                &nbsp;
            </div>
        </div>
        <div className="bg-neutral-0 w-full text-center flex justify-center flex-col pt-0.5 top-0 z-30 sticky shadow">
            <div className="flex justify-between md:justify-center items-center w-full">
                <span
                    className="pl-1 md:hidden"
                    onClick={() => setMobileMenu(!mobileMenu)}>
                        <img src={mobileMenu ? "/img/times-solid.svg" : "/img/bars-solid.svg"} alt="Menu" className="h-1"/>
                </span>
                <span className="font-title text-white uppercase tracking-wider text-lg font-normal">Mumford & Wood</span>
                <span className="pr-1 md:hidden"><img src="/img/envelope.svg" alt="Enquire" className="h-1"/></span>
            </div>
            <span className="font-title text-primary-base uppercase tracking-wider text-sm font-bold">EST. 1954</span>
            <div className="bg-primary-neutral h-0.25 w-full mt-0.5"></div>
            <div className="hidden md:flex">
                <NavList />
            </div>
        </div>

        {mobileMenu &&
            <div className="top-5 fixed z-30 bg-primary-neutral h-full w-full">
                <NavList />
            </div>
        }
      </>
    )
  }

  export default Header;
