import React, { useState } from 'react';
import Head from 'next/head'
import { Header } from '@components/Header';
import { Enquire } from '@forms/Enquire';

export interface LayoutProps {
    layout?: string;
    header?: boolean;
    title?: string;
    image?: string;
    children: any;
}

export const Layout: React.FC<LayoutProps> = ({
    layout,
    header,
    title,
    image,
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
                <img src={image} />
            </div>
        }
        <div className="container m-auto p-2 -mt-2 max-w-6xl bg-white border-t-4 border-primary-base border-solid z-10 relative">
            {layout === "enquire" ?
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
