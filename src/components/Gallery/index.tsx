import React from 'react';
import GalleryItem from './item';
import { SRLWrapper } from "simple-react-lightbox";
import Image from 'next/image';

type GalleryItem = {
    fields: {
        file: {
            url: string;
        }
    }
    large: string;
    thumbnail: string;
    alt: string;
}

type Props = {
    items: GalleryItem[];
}
export const Gallery: React.FC<Props> = ({
    items
}) => {
    return (
        <div>
            {items &&
                <div className="flex items-center justify-between mb-1">
                    <span className="font-heading">{items.length} images</span>
                    <span className="flex items-center space-x-0.25 font-heading"><Image src="/img/icon-eye.svg" height={16} width={16}/> <span>View slideshow</span></span>
                </div>
            }
            <SRLWrapper>
                <div className="grid grid-cols-4 gap-0.25">
                    {items?.map((item,i)=>
                        <GalleryItem
                            thumbnail={item.fields.file.url}
                            large={item?.fields?.file.url}
                            alt="dqwd"
                        />
                    )}
                </div>
            </SRLWrapper>
        </div>
    )
  }

  export default Gallery;
