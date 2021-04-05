import React, { useState } from 'react';
import Head from 'next/head';
import { Header } from '@components/Header';
import { SubheaderRange } from '@components/SubHeaderRange';
import { SubheaderContact } from '@components/SubheaderContact';
import Footer from '@components/Footer';
import { useRouter } from 'next/router';
import Form from '@components/Form';
import Breadcrumb, { CrumbItem } from '@components/Breadcrumb';
import {
    GoogleReCaptchaProvider
} from 'react-google-recaptcha-v3';

//https://www.freecodecamp.org/news/how-to-add-interactive-animations-and-page-transitions-to-a-next-js-web-app-with-framer-motion/
type Sidebar = 'none' | 'estimate' | 'brochure' | 'apprenticeship';

export interface LayoutProps {
    sidebar?: Sidebar;
    header?: boolean;
    border?: boolean;
    title?: string;
    image?: string;
    breadcrumbs?: CrumbItem[];
    children: any;
}

export const Layout: React.FC<LayoutProps> = ({
    sidebar,
    header,
    title,
    image,
    breadcrumbs,
    border = false,
    children
}) => {
    const { asPath } = useRouter();

    return <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHA_SITE_KEY}>
        <div>
        <Head>
            <title>{title} | Mumford & Wood</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {header && <Header/> }

        {asPath.includes("product-ranges/") &&
            <SubheaderRange />
        }

        {(asPath.includes("contact") || asPath.includes("sales")) &&
            <SubheaderContact />
        }

        {title &&
            <div className="py-2 md:py-3 text-center justify-center max-w-5xl m-auto">
                <h1 className="font-title text-2xl md:text-4xl uppercase">{title}</h1>
                {breadcrumbs && <Breadcrumb crumbs={breadcrumbs}/>}
            </div>
        }

        {image &&
            <div className="mx-0.5 rounded-md overflow-hidden z-0 mb-1 md:mb-2 h-16 md:h-32">
                <img src={image} className="w-full h-full object-cover"/>
            </div>
        }
        <div className={`container m-auto max-w-6xl z-10 relative ${border && 'p-2 -mt-2 bg-white border-t-4 border-primary-base border-solid'}`}>
            {sidebar !== "none" ?
                <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0 flex">
                    <div className="lg:w-3/4">{children}</div>
                    <div className="lg:w-1/4">
                        <div className="bg-primary-neutral rounded-md p-1.5 top-11 sticky">
                            <Form type="estimate"/>
                        </div>
                    </div>
                </div> :
                <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0">
                    {children}
                </div>
            }
        </div>
        <Footer />
</div>
</GoogleReCaptchaProvider>
}

export default Layout;

Layout.defaultProps = {
    header: true,
    sidebar: 'estimate'
}
