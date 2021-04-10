import React, { useState } from 'react';
import GalleryItem from './item';
import Carousel from "react-simply-carousel";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
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
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (tabIndex: number) => {
        setPhotoIndex(tabIndex);
        setIsOpen(true);
    }

    let images = [];
    items?.forEach(item => {
        images.push(item.fields.file.url);
    });

    return (
        <div>
            {items &&
                <div className="flex items-center justify-between mb-1">
                    <span className="font-heading">{items.length} images</span>
                    <span className="flex items-center space-x-0.25 font-heading"><Image src="/img/icon-eye.svg" height={16} width={16}/> <span>View slideshow</span></span>
                </div>
            }
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0.25">
                    {items?.map((item,i)=>
                        <GalleryItem
                            index={i}
                            thumbnail={item.fields.file.url}
                            alt="dqwd"
                            key={`gallery_${i}`}
                            onGalleryClick={handleChange}
                        />
                    )}
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    />
                )}
        </div>
    )
  }

  export default Gallery;
