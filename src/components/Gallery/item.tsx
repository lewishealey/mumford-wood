import React from 'react';
import Image from 'next/image';
export interface Props {
    thumbnail: string;
    large: string;
    alt: string;
}

export const GalleryItem: React.FC<Props> = ({
    thumbnail,
    large,
    alt
}) => {
    return (
        <a href={large} className="w-full h-10 relative rounded-sm overflow-hidden">
            <div className="w-full h-full bg-neutral-0 z-10 absolute top-0 left-0 bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center cursor-pointer">
                <Image src="/img/hover.svg" alt="Hover" height={42} width={42}/></div>
            <img src={thumbnail} className="w-full h-full object-cover" alt={alt}/>
        </a>
    )
  }

  export default GalleryItem;
