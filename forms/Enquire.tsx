import React, { useState } from 'react';
import fire from '@lib/firebase';

export interface EnquireProps {
}

export const Enquire: React.FC<EnquireProps> = ({

}) => {

    const [fName, setFName] = useState('Gary');
    const [lName, setLName] = useState('Neville');
    const [email, setEmail] = useState('testing@mumford.com');
    const [phone, setPhone] = useState('07941070222');
    const [profession, setProfession] = useState('Architect');

    const submitEnquiry = () => {
    fire.firestore()
          .collection('enquiries')
          .add({
                date: new Date(),
                entity: 'About',
                fName,
                lName,
                email,
                phone,
                profession

          });
    }

    return ( <div className="space-y-1 mt-1">
                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="First name" type="text" required onChange={(e) => setFName(e.target.value)} onKeyUp={(e) => setFName((e.target as HTMLTextAreaElement).value)} value={fName}/>

                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="Last name" type="text" required onChange={(e) => setLName(e.target.value)} onKeyUp={(e) => setLName((e.target as HTMLTextAreaElement).value)} value={lName}/>

                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="Email address" type="email" required onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => setEmail((e.target as HTMLTextAreaElement).value)} value={email}/>

                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="Phone number" type="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} onKeyUp={(e) => setPhone((e.target as HTMLTextAreaElement).value)}/>

                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="Profession" type="email" required onChange={(e) => setProfession(e.target.value)} onKeyUp={(e) => setProfession((e.target as HTMLTextAreaElement).value)} value={profession}/>

                <button className="bg-primary-base text-white text-lg w-full px-1 py-0.5" onClick={submitEnquiry}>Proceed</button>
            </div>
    )
  }

  export default Enquire;
