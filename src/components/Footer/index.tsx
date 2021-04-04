import React from 'react';
import Image from 'next/image';
import TextField from '@components/TextField';
import Button from '@components/Button';
import { currentYear } from '@utils/helpers';
export interface Props {
}

export const Footer: React.FC<Props> = ({
}) => {
    return (
        <div className="p-2 bg-gray-100 mt-2">
            <div className="container m-auto max-w-6xl">
                <div className="flex">
                <div className="w-1/3">
                    <h5 className="font-heading text-xl mb-1">Pages</h5>
                </div>
                <div className="w-1/3">
                    <h5 className="font-heading text-xl mb-1">Social</h5>
                    <div className="flex space-x-1">
                        <div><Image src="/img/facebook.svg" height={40} width={40} alt="Facebook"/></div>
                        <div><Image src="/img/twitter.svg" height={40} width={40} alt="Twitter"/></div>
                        <div><Image src="/img/instagram.svg" height={40} width={40} alt="Instagram"/></div>
                        <div><Image src="/img/linkedin.svg" height={40} width={40} alt="Linkedin"/></div>
                    </div>
                </div>
                <div className="w-1/2">
                    <h5 className="font-heading text-xl mb-1">Sign up to our newsletter</h5>
                    <div className="flex space-x-1 items-end">
                        <TextField
                            size="compact"
                            type="text"
                            label="Name *"
                            name="name"
                        />
                        <TextField
                            size="compact"
                            type="email"
                            label="Email *"
                            name="eemail"
                        />
                        <Button
                            size="compact"
                            style="primary"
                            >
                            Request estimate
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex space-x-1 justify-between mt-3">
                <div className="flex items-center"><Image src="/img/iso.png" height={50} width={62} alt="ISO"/></div>
                <div className="flex items-center"><Image src="/img/fsc.png" height={69} width={69} alt="FSC"/></div>
                <div className="flex items-center"><Image src="/img/ukca.png" height={39} width={39} alt="UKCA"/></div>
                <div className="flex items-center"><Image src="/img/iso9001.png" height={90} width={90} alt="ISO 9001"/></div>
                <div className="flex items-center"><Image src="/img/iso14001.png" height={90} width={90} alt="ISO 9001"/></div>
                <div className="flex items-center"><Image src="/img/BS6.png" height={90} width={90} alt="BS6"/></div>
                <div className="flex items-center"><Image src="/img/energy.png" height={69} width={96} alt="Energy"/></div>
                <div className="flex items-center"><Image src="/img/made-in-britain.png" height={68} width={68} alt="Made in Britain"/></div>
                <div className="flex items-center"><Image src="/img/bwf.png" height={74} width={103} alt="BWF"/></div>
                <div className="flex items-center"><Image src="/img/houzz.png" height={69} width={96} alt="Houzz"/></div>
                <div className="flex items-center"><Image src="/img/constructiononline.png" height={74} width={103} alt="constructiononline"/></div>
            </div>
            <div className="flex justify-between mt-3 text-sm">
                © Copyright {currentYear} Mumford & Wood Timber Windows and Doors

                <nav className="m-0 p-0 list-none flex space-x-1">
                    <li>Terms</li>
                    <li>Policies</li>
                    <li>Site map</li>
                </nav>
            </div>
            </div>
        </div>
    )
  }

  export default Footer;
