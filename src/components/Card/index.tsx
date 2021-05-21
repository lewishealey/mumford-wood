import React, { useState } from 'react';
import classNames from 'classnames';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';
import Link from 'next/link';
export interface Props {
    title?: string;
    highlight?: string;
    href?: string;
    summary?: any;
    height?: string;
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
    height,
    image,
    align,
    border,
    circle,
    thumbnail,
    children
}) => {
    const classes = classNames(
        `mb-0.5 object-${thumbnail} ${!circle && `${height} w-full`} m-auto rounded-sm`, {
            'border border-solid border border-neutral-3': border,
            'rounded-full h-4 w-4' : circle,
        }
    );

    const contents = <div className={`text-${align}`}>
            {image && <img src={`${image}?w=300`} className={classes} />}
            {highlight && <h5 className="font-heading text-primary-base text-sm uppercase font-bold tracking-widest mt-0.75 mb-0.25">{highlight}</h5>}
            {title && <h4 className={`font-heading font-bold text-lg m-0 mb-0.5 ${!highlight && 'mt-1'}`}>{title}</h4>}
            {summary && documentToReactComponents(summary,options)}
            {children && children}
        </div>;

        if(href) {
            return <Link href={href}>
                    <a className="cursor-pointer transform hover:opacity-60 duration-200 ease-linear">
                        {contents}
                    </a>
                </Link>
        } else {
            return contents;
        }
  }

  export default Card;

  Card.defaultProps = {
      height: 'h-14',
      thumbnail: 'cover',
      align: 'left'
  }
