import React, { useContext } from "react";
import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RichText from "@utils/renderers/RichText";
import Image from "next/image";

export interface Props {
  year: string;
  children: any;
  index: number;
  thumbnail: string;
}

export const Timeline: React.FC<Props> = ({ year, children, thumbnail, index }) => {
  const cardBg = classNames(
    `order-1 bg-white rounded overflow-hidden shadow-lg w-full md:w-5/12 ml-1 mr-1 md:mr-0 md:ml-0`
  );
  const cardTitle = classNames(
    `mb-1 font-bold text-gray-800 text-2xl font-heading`
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  return (
    <motion.div ref={ref} animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50
    }} transition={{ duration: 1 }}>
      <div className={`mb-4 md:mb-8 flex justify-between items-center w-full relative`}>
        <div
          className={`${
            index % 2 ? "order-1" : "md:order-3"
          } hidden md:flex md:w-5/12`}
        ></div>
        <div
          className={`z-20 flex items-center relative ${
            index % 2 ? "order-1" : "md:order-2"
          } bg-primary-base w-1.25 h-1.25 ml-0.5 md:ml-0.25 md:w-1.5 md:h-1.5 shadow-md flex-shrink-0 rounded-full`}
        ></div>
        <div className={cardBg}>
            {thumbnail && <div className="relative w-full h-10"><Image src={thumbnail} className="max-h-2" layout="fill" objectFit="cover"/></div>}
            <div className="px-2 py-1">
                <h3 className={cardTitle}>{year}</h3>
                <RichText content={children} />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
