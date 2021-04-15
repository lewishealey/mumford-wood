import React, { useState } from 'react';
import classNames from 'classnames';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';
import Link from 'next/link';
export interface Props {
    title: string;
    highlight?: string;
    href?: string;
    summary?: any;
    height?: string;
    image: string;
    border: boolean;
    thumbnail?: string;
    children?: any;
}

export const Card: React.FC<Props> = ({
    title,
    highlight,
    href,
    summary,
    height,
    image,
    border,
    thumbnail,
    children
}) => {
    const classes = classNames(
        `mb-0.5 object-${thumbnail} ${height} w-full rounded-sm`,
        { 'border border-solid border border-neutral-3': border }
    );

    const contents = <div>
            <img src={image} className={classes} />
            {highlight && <h5 className="font-heading text-primary-base text-sm uppercase font-bold tracking-widest mt-1 mb-0.5">{highlight}</h5>}
            {title && <h4 className="font-body font-bold text-lg m-0 mb-0.5">{title}</h4>}
            {summary && documentToReactComponents(summary,options)}
            {children && children}
        </div>;

        if(href) {
            return <Link href={href}>
                    <a className="cursor-pointer">
                        {contents}
                    </a>
                </Link>
        } else {
            return contents;
        }
  }

  export default Card;

  Card.defaultProps = {
      image: "http://www.mumfordwood.com/images/quick-links/Mumford-Wood-Brochure-2017.jpg",
      height: "h-14",
      thumbnail: "cover"
  }
