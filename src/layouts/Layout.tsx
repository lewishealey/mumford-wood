import React, { useState } from 'react';
import Head from 'next/head'
import { Header } from 'src/components/Header';
import { Enquire } from 'src/forms/Enquire';

//https://www.freecodecamp.org/news/how-to-add-interactive-animations-and-page-transitions-to-a-next-js-web-app-with-framer-motion/
export interface LayoutProps {
    sidebar?: boolean;
    header?: boolean;
    border?: boolean;
    title?: string;
    image?: string;
    children: any;
}

export const Layout: React.FC<LayoutProps> = ({
    sidebar,
    header,
    title,
    image,
    border = false,
    children
}) => {

    return <div>
        <Head>
            <title>Mumford & Wood</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {header && <Header/> }

        {title &&
            <div className="py-3 text-center">
                <h1 className="font-title text-4xl uppercase">{title}</h1>
            </div>
        }

        {image &&
            <div className="mx-0.5 rounded-md overflow-hidden z-0">
                <img src={image} className="w-full"/>
            </div>
        }
        <div className={`container m-auto max-w-6xl z-10 relative ${border && 'p-2 -mt-2 bg-white border-t-4 border-primary-base border-solid'}`}>
            {sidebar ?
                <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0 flex">
                    <div className="w-2/3">{children}</div>
                    <div className="w-1/3">
                        <div className="bg-primary-neutral rounded-md p-2 top-11 sticky">
                            <h3 className="font-heading text-xl">Get an estimate</h3>
                            <Enquire />
                        </div>
                    </div>
                </div> :
                <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0">
                    {children}
                </div>
            }
        </div>
</div>
}

export default Layout;

Layout.defaultProps = {
    header: true
}
