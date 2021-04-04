import React from 'react';
import Image from 'next/image';

export interface Props {
    image: string;
}

export const Profile: React.FC<Props> = ({
    image
}) => {
    return (
        <div className="rounded-full overflow-hidden relative h-5 w-5">
            <img src={image} alt="image" className="w-full h-full object-cover"/>
        </div>
    )
  }

  export default Profile;
