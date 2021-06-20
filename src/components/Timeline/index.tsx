import React, { useContext } from "react";
import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RichText from "@utils/renderers/RichText";

export interface Props {
  year: string;
  children: any;
  index: number;
}

export const Timeline: React.FC<Props> = ({ year, children, index }) => {
  const cardBg = classNames(
    `order-1 bg-royal-neutral rounded w-full md:w-5/12 p-2 ml-1 mr-1 md:mr-0 md:ml-0`
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
      <div className={`mb-4 md:mb-8 flex justify-between items-center w-full`}>
        <div
          className={`${
            index % 2 ? "order-1" : "md:order-3"
          } hidden md:flex md:w-5/12`}
        ></div>
        <div
          className={`z-20 flex items-center ${
            index % 2 ? "order-1" : "md:order-2"
          } bg-royal-base w-1.25 h-1.25 ml-0.5 md:ml-0.25 md:w-2 md:h-2 flex-shrink-0 rounded-full`}
        ></div>
        <div className={cardBg}>
          <h3 className={cardTitle}>{year}</h3>
          <RichText content={children} />
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
