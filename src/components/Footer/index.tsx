import React from 'react';
import Image from 'next/image';
import Newsletter from '@components/Form/newsletter';
import Link from 'next/link';

import { currentYear } from '@utils/helpers';
export interface Props {
}

export const Footer: React.FC<Props> = ({
}) => {
    return (
        <div className="p-2 bg-gray-100 mt-2">
            <div className="container m-auto max-w-6xl">
                <div className="space-y-1 md:space-y-0 md:flex justify-between">
                <div className="w-full md:w-1/3">
                    <h5 className="font-heading text-xl mb-1">Pages</h5>
                    <div className="grid grid-cols-2 gap-1">
                        <a href="/" target="blank">Home</a>
                        <a href="/about-us">About us</a>
                        <a href="/product-ranges/conservation-range">Conservation Range</a>
                        <a href="/product-ranges/classic-range">Classic Range</a>
                        <a href="/product-ranges/heritage-range">Heritage Range</a>
                        <a href="/professional">Professional</a>
                        <a href="/case-studies">Case studies</a>
                        <a href="/contact-us">Contact us</a>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <h5 className="font-heading text-xl mb-1">Social</h5>
                    <div className="flex space-x-1">
                        <a href="https://www.facebook.com/mumfordwood" target="blank"><Image src="/img/facebook.svg" height={40} width={40} alt="Facebook"/></a>
                        <a href="https://twitter.com/mumfordwood" target="blank"><Image src="/img/twitter.svg" height={40} width={40} alt="Twitter"/></a>
                        <a href="https://www.instagram.com/mumfordandwood/" target="blank"><Image src="/img/instagram.svg" height={40} width={40} alt="Instagram"/></a>
                        <a href="https://www.linkedin.com/company/mumford-&-wood" target="blank"><Image src="/img/linkedin.svg" height={40} width={40} alt="Linkedin"/></a>
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                    <Newsletter />
                </div>
            </div>
            <div className="grid grid-cols-3 space-y-1 md:space-y-0 md:flex flex-wrap md:flex-nowrap md:space-x-1 justify-between mt-3">
                <div className="flex items-center justify-center"><Image src="/img/iso.svg" height={50} width={62} alt="ISO"/></div>
                <div className="flex items-center justify-center"><Image src="/img/iso-14001.svg" height={60} width={60} alt="ISO 9001"/></div>
                <div className="flex items-center justify-center"><Image src="/img/fsc.svg" height={50} width={69} alt="FSC"/></div>
                <div className="flex items-center justify-center"><Image src="/img/ukca.svg" height={50} width={50} alt="UKCA"/></div>
                <div className="flex items-center justify-center"><Image src="/img/bsi.svg" height={50} width={50} alt="BSI"/></div>
                <div className="flex items-center justify-center"><Image src="/img/energy.svg" height={60} width={60} alt="Energy"/></div>
                <div className="flex items-center justify-center px-0.5"><Image src="/img/made-in-britain-black.svg" height={70} width={100} alt="Made in Britain"/></div>
                <div className="flex items-center justify-center px-0.5"><Image src="/img/bwf.svg" height={74} width={103} alt="BWF"/></div>
                <div className="flex items-center justify-center px-0.5"><Image src="/img/houzz.svg" height={80} width={100} alt="Houzz"/></div>
                <div className="flex items-center justify-center px-0.5"><Image src="/img/constructiononline.svg" height={74} width={103} alt="constructiononline"/></div>
            </div>
            <div className="flex space-y-1 md:space-y-0 flex-col md:flex-row justify-between mt-3 text-sm">
                <div>© Copyright {currentYear} Mumford & Wood Timber Windows and Doors</div>

                <nav className="m-0 p-0 list-none flex space-x-1">
                    <li><Link href="/terms">Terms</Link></li>
                    <li><Link href="policies">Policies</Link></li>
                    <li><Link href="site-map">Site map</Link></li>
                </nav>
            </div>
            </div>
        </div>
    )
  }

  export default Footer;
