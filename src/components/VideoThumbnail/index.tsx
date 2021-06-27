import React, { useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Modal from "@components/Modal";
import YouTube from "react-youtube";

export interface Props {
  video: string;
  image: string;
  title: string;
}

export const VideoThumbnail: React.FC<Props> = ({ video, image, title }) => {
    const [isVideoShowing, setVideoShowing] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };


  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
      }}
      transition={{ duration: 0.5 }}
    >
      <Modal
        isOpen={isVideoShowing}
        onOverlayClick={() => setVideoShowing(false)}
      >
        <YouTube videoId={video} />
      </Modal>
      <div>
        <div className="relative h-10 md:h-20 w-full rounded overflow-hidden" onClick={() => setVideoShowing(true)}>
          <div className="w-full h-full bg-neutral-0 z-20 absolute top-0 left-0 bg-opacity-50 hover:bg-opacity-25 opacity-100 transition ease-in-out duration-200 flex justify-center items-center cursor-pointer">
            <Image src="/img/play.svg" alt="Hover" height={60} width={60} />
          </div>
          <Image
            src={image}
            layout="responsive"
            height="100%"
            width="100%"
            objectFit="contain"
            objectPosition="top"
          />
        </div>
        <h4 className="text-xl mt-1 font-medium font-heading">{title}</h4>
      </div>
    </motion.div>
  );
};

export default VideoThumbnail;
