import React, { useState } from "react";
import GalleryItem from "./item";
import Carousel from "react-simply-carousel";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import Image from "next/image";

type GalleryItem = {
  fields: {
    file: {
      url: string;
    };
    title: string;
  };
  large: string;
  thumbnail: string;
  alt: string;
};

type Props = {
  items: GalleryItem[];
  columns?: number;
};

export const Gallery: React.FC<Props> = ({ items, columns }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleChange = (tabIndex: number) => {
    setPhotoIndex(tabIndex);
    setIsOpen(true);
  };

  let images = [];
  items?.forEach((item) => {
    images.push({
      url: item?.fields?.file?.url,
      caption: item?.fields?.title,
    });
  });

  const pictures = showAll ? items : items.slice(0, 8);

  return (
    <div>
      {items && (
        <div className="flex items-center justify-between mb-1">
          {pictures.length !== items.length && (
            <div className="font-heading space-x-0.5 flex text-sm md:text-base">
              <span>
                Showing {pictures.length}/{items.length} images
              </span>
              <button onClick={() => setShowAll(true)}>Show all</button>
            </div>
          )}
          <span
            className="flex items-center space-x-0.25 text-sm md:text-base font-heading cursor-pointer hover:opacity-80"
            onClick={() => handleChange(2)}
          >
            <Image src="/img/icon-eye.svg" height={16} width={16} />{" "}
            <span>View slideshow</span>
          </span>
        </div>
      )}
      <div
        className={`grid grid-cols-${
          columns < 2 ? "1" : "2"
        } md:grid-cols-4 gap-0.25`}
      >
        {pictures?.map(
          (item, i) =>
            item?.fields?.file?.url && (
              <GalleryItem
                index={i}
                thumbnail={item?.fields?.file?.url}
                alt="dqwd"
                key={`gallery_${i}`}
                onGalleryClick={handleChange}
              />
            )
        )}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]?.url}
          imageCaption={images[photoIndex]?.caption}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default Gallery;

Gallery.defaultProps = {
  columns: 4,
};
