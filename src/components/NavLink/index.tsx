import React from 'react';
import Emblem from '@images/emblem.svg'
import MadeInBritain from '@images/made-in-britain-white.svg'

export interface NavLinkProps {
    title: string,
    link: string
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavLink: React.FC<NavLinkProps> = ({
    title,
    link,
  }) => {
    return (
        <>
        <div className="bg-neutral-0 w-full text-center flex justify-between content-center items-center flex-row pt-1 -mb-0.5 px-2">
            <div className="flex-1 text-left">
                <img src={MadeInBritain} alt="Made in Britain" className="h-3 mb-0.5"/>
            </div>
            <img src={Emblem} alt="Emblem" className="h-4 mb-0.5 flex-1"/>
            <div className="flex-1 text-right">
                &nbsp;
            </div>
        </div>
        <div className="bg-neutral-0 w-full text-center flex justify-center flex-col pt-1 top-0 sticky shadow">
            <span className="font-logo text-white uppercase tracking-wider text-lg">Mumford & Wood</span>
            <span className="font-logo text-primary-base uppercase tracking-wider text-sm font-bold">EST. 1954</span>
            <div className="bg-primary-neutral h-0.5 w-full mt-1"></div>
        </div>
      </>
    )
  }
