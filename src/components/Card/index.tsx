import React, { useState } from "react";
import classNames from "classnames";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import Link from "next/link";
import Image from "next/image";
export interface Props {
  title?: string;
  highlight?: string;
  href?: string;
  summary?: any;
  height?: string;
  objectFit?: "contain" | "cover";
  objectPosition?: "top" | "center" | "bottom";
  width?: number;
  image?: string;
  align?: string;
  border: boolean;
  circle?: boolean;
  thumbnail?: string;
  children?: any;
}

export const Card: React.FC<Props> = ({
  title,
  highlight,
  href,
  summary,
  width = 300,
  objectFit = "cover",
  objectPosition = "top",
  height,
  image,
  align,
  border,
  circle,
  thumbnail,
  children,
}) => {
  const classes = classNames(
    `mb-0.5 relative ${
      !circle && `${height} w-full`
    } m-auto rounded-sm flex-shrink-0`,
    {
      "border border-solid border border-neutral-3": border,
      "h-8 w-8 flex-shrink-0 flex-grow-0 rounded-full overflow-hidden": circle,
    }
  );

  const contents = (
    <div
      className={`text-${align} border rounded-lg p-1 md:p-0 md:rounded-none md:border-0`}
    >
      {image && (
        <div className={classes}>
          <Image
            src={`https:${image}?w=${width}`}
            className="h-full w-full"
            layout="fill"
            objectPosition={objectPosition}
            objectFit={objectFit}
          />
        </div>
      )}
      {highlight && (
        <h5 className="font-heading text-primary-base text-sm uppercase tracking-widest mt-0.75 mb-0.25">
          {highlight}
        </h5>
      )}
      {title && (
        <h4
          className={`font-heading text-xl m-0 md:mb-0.5 ${
            !highlight && "mt-0.75 md:mt-1"
          }`}
        >
          {title}
        </h4>
      )}
      {summary && (
        <div className="mt-0.5">
          {documentToReactComponents(summary, options)}
        </div>
      )}
      {children && children}
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <a className="cursor-pointer transform hover:opacity-60 duration-200 ease-linear">
          {contents}
        </a>
      </Link>
    );
  } else {
    return contents;
  }
};

export default Card;

Card.defaultProps = {
  height: "h-14",
  thumbnail: "cover",
  align: "left",
};
