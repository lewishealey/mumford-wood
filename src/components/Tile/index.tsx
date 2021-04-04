import React from 'react';
import Link from 'next/link';

export interface Props {
    href: string;
    title: string;
    size: 'default' | 'compact';
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
    highlight,
    summary,
    image,
    border,
    children
}) => {

    const defineSize = (size === 'default' ? 'h-28' : 'h-24');

    return (
        <Link href={href}>
            <a className={`relative flex ${border && 'border-primary-base hover:border-neutral-2 border-solid border-t-2'} font-heading text-base transition-all duration-500 ease-in-out w-full overflow-hidden rounded ${defineSize}`}>
                {children}
                <img src={image} className={`object-cover ${defineSize} w-full`}/>
                <div className="absolute bottom-1 md:bottom-2 px-1 w-full z-10">
                    <div className="bg-white text-center py-0.75 shadow-md rounded-md px-1">
                        {highlight && <h3 className="font-heading text-primary-base text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">{highlight}</h3>}
                        {title && <h4 className="font-heading text-neutral-0 text-xl m-0">{title}</h4>}
                        {summary && <p className="font-body m-0 mt-0.5 text-neutral-0 text-center">{summary}</p>}
                    </div>
                </div>
            </a>
      </Link>
    )
  }

  export default Tile;
