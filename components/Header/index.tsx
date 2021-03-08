import React, { useState } from 'react';
import Emblem from '@images/emblem.svg'
import MadeInBritain from '@images/made-in-britain-white.svg'
import NavList from '@components/NavList';
import Envelope from '@images/envelope.svg';
import BarsSolid from '@images/bars-solid.svg';
import TimesSolid from '@images/times-solid.svg';
export interface HeaderProps {

}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Header: React.FC<HeaderProps> = ({
  }) => {
    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <>
        <div className="hidden md:flex bg-neutral-0 w-full text-center justify-between content-center items-center flex-row pt-1 -mb-0.5 px-2 hidden">
            <div className="flex-1 text-left">
                <img src={MadeInBritain} alt="Made in Britain" className="h-3 mb-0.5"/>
            </div>
            <img src={Emblem} alt="Emblem" className="h-4 mb-0.5 flex-1"/>
            <div className="flex-1 text-right">
                &nbsp;
            </div>
        </div>
        <div className="bg-neutral-0 w-full text-center flex justify-center flex-col pt-1 top-0 z-30 sticky shadow">
            <div className="flex justify-between md:justify-center items-center w-full">
                <span
                    className="pl-1 md:hidden"
                    onClick={() => setMobileMenu(!mobileMenu)}>
                        <img src={mobileMenu ? TimesSolid : BarsSolid} alt="Menu" className="h-1"/>
                </span>
                <span className="font-title text-white uppercase tracking-wider text-lg font-normal">Mumford & Wood</span>
                <span className="pr-1 md:hidden"><img src={Envelope} alt="Enquire" className="h-1"/></span>
            </div>
            <span className="font-title text-primary-base uppercase tracking-wider text-sm font-bold">EST. 1954</span>
            <div className="bg-primary-neutral h-0.5 w-full mt-1"></div>
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