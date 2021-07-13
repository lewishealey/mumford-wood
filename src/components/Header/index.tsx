import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavList from "@components/NavList";
export interface HeaderProps {}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Header: React.FC<HeaderProps> = ({}) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  return (
    <>
      <div className="hidden md:flex bg-neutral-0 w-full text-center justify-center content-center items-center flex-row pt-0.5 -mb-0.5 px-2 z-20">
        <Link href="/">
          <a title="Back to homepage">
            <div className="flex items-bottom bottom-0 m-auto justify-center">
              <Image
                src="/img/emblem.svg"
                width={64}
                height={71}
                alt="Emblem"
                title="Emblem"
              />
            </div>
          </a>
        </Link>
      </div>
      <div
        className={`bg-neutral-0 w-full text-center flex justify-center flex-col pt-0.5 top-0 shadow z-40 ${
          isSticky && "sticky"
        }`}
      >
        <div className="flex justify-between items-center w-full px-2">
          <div className="md:flex-1">
            <img
              src="/img/made-in-britain-white.svg"
              alt="Made in Britain"
              title="Made in Britain"
              className="h-2.5 hidden md:block"
            />
            <span
              className="md:pl-1 md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <img
                src={
                  mobileMenu ? "/img/times-solid.svg" : "/img/bars-solid.svg"
                }
                className="h-1 cursor-pointer"
                alt="Mobile menu" title="Mobile menu"
              />
            </span>
          </div>
          <div className="flex md:flex-1 flex-col justify-center w-full text-center">
            <Link href="/">
              <a title="Back to homepage" className="flex flex-col">
                <span className="font-title text-white uppercase tracking-wider text-lg font-normal">
                  Mumford & Wood
                </span>
                <span className="font-title text-primary-base uppercase tracking-wider text-sm font-bold">
                  EST. 1954
                </span>
              </a>
            </Link>
          </div>
          <div className="md:flex-1 cursor-pointer">
            <Link href="/contact-us">
                <img src="/img/envelope.svg" className="h-1 md:hidden" alt="Enquire" title="Enquire"/>
            </Link>
          </div>
        </div>
        <div className="bg-primary-neutral h-0.25 w-full mt-0.5"></div>
        <div className="hidden md:flex">
          <NavList />
        </div>
      </div>

      {mobileMenu && (
        <div className="top-4 fixed bg-primary-neutral h-full w-full z-50">
          <NavList />
        </div>
      )}
    </>
  );
};

export default Header;
