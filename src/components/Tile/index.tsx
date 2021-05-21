import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export interface Props {
    href: string;
    title: string;
    size: 'default' | 'compact';
    style: 'default' | 'conservation' | 'classic' | 'heritage';
    highlight?: string;
    border?: boolean;
    summary?: string;
    image: string;
    children?: string;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Tile: React.FC<Props> = ({
    href,
    title,
    size,
    style = 'conservation',
    highlight,
    summary,
    image,
    border,
    children
}) => {

    const defineSize = (size === 'default' ? 'h-32' : 'h-24');

    const classes = classNames(`bg-white text-center py-0.75 px-1`, {
        'bg-primary-fade' : style === 'conservation'
    });

    return (
        <Link href={href}>
            <a className={`relative flex ${border && 'border-primary-base hover:border-neutral-2 border-solid border-t-2'} shadow-md hover:shadow-lg font-heading text-base transition-all duration-500 ease-in-out w-full overflow-hidden rounded ${defineSize}`}>
                {children}
                <img src={`${image}?w=400`} className={`object-cover ${defineSize} w-full`}/>
                <div className="absolute bottom-0 w-full z-10">
                    <div className={classes}>
                        {highlight && <h3 className="font-heading text-primary-base text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">{highlight}</h3>}
                        {title && <h4 className="font-heading text-neutral-0 text-xl m-0">{title}</h4>}
                        {summary && <p className="font-body m-0 text-neutral-0 text-center">{summary}</p>}
                    </div>
                </div>
            </a>
      </Link>
    )
  }

  export default Tile;
