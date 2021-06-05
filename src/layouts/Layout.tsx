import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { Header } from "@components/Header";
import { SubheaderRange } from "@components/SubHeaderRange";
import { SubheaderContact } from "@components/SubheaderContact";
import Footer from "@components/Footer";
import Slider from "react-slick";
import Keys from "@components/Keys";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "@components/Form";
import Breadcrumb, { CrumbItem } from "@components/Breadcrumb";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import RequestEstimate from "@components/Form/request-estimate";
import DownloadBrochure from "@components/Form/download-brochure";
import Apprenticeship from "@components/Form/apprenticeship";
import YouTube from "react-youtube";
import Modal from "@components/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

//https://www.freecodecamp.org/news/how-to-add-interactive-animations-and-page-transitions-to-a-next-js-web-app-with-framer-motion/
type Sidebar = "none" | "estimate" | "brochure" | "apprenticeship";

type GalleryItem = {
  fields: {
    file: {
      url: string;
    };
  };
  large: string;
  thumbnail: string;
  alt: string;
};
export interface LayoutProps {
  header?: boolean;
  gallery?: GalleryItem[];
  border?: boolean;
  preview?: boolean;
  title?: string;
  sidebarType?: Sidebar;
  image?: any;
  video?: string;
  breadcrumbs?: CrumbItem[];
  children: any;
  id?: string;
}
//https://www.youtube.com/watch?v=zIDpZi-36Qs
export const Layout: React.FC<LayoutProps> = ({
  id,
  header,
  title,
  image,
  video,
  gallery,
  sidebarType,
  breadcrumbs,
  border = false,
  children,
  preview,
}) => {
  const { asPath } = useRouter();
  const sliderRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoShowing, setVideoShowing] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleDirection = (dir: string) => {
    // setTabIndex(dir);
    if (typeof dir === "string" && dir == "prev") {
      sliderRef?.current?.slickPrev();
    } else {
      sliderRef?.current?.slickNext();
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHA_SITE_KEY}>
      <div className="bg-white">
        <Head>
          <title>{title} | Mumford & Wood</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Modal isOpen={isModalOpen} onOverlayClick={() => setModalOpen(false)}>
          <Dialog onCloseClick={() => setModalOpen(false)}>
            <Form inputs type={sidebarType} />
          </Dialog>
        </Modal>

        <Modal
          isOpen={isVideoShowing}
          onOverlayClick={() => setVideoShowing(false)}
        >
          <YouTube videoId={"ljrFq_PkugU"} />
        </Modal>

        {preview && (
          <div className="w-full p-1 text-default bg-primary-fade">
            You are in preview mode!
            <Link href="/api/exit-preview/">
              <a className="underline hover:opacity-60">Exit preview</a>
            </Link>
          </div>
        )}

        {header && <Header />}

        {asPath.includes("product-ranges/") && <SubheaderRange />}

        {(asPath.includes("contact") || asPath.includes("sales")) && (
          <SubheaderContact />
        )}

        {title && (
          <div className="py-2 md:py-3 text-center justify-center max-w-5xl m-auto px-1">
            <motion.h1
              className="font-title text-2xl md:text-4xl uppercase"
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              {title}
            </motion.h1>
            {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
          </div>
        )}

        {/* overflow-hidden md:mb-2 h-16 md:h-32  */}

        {image && !video && (
          <div className="relative">
            {gallery && (
              <div className="absolute w-full bottom-1 md:bottom-3 z-10">
                <div className="container m-auto max-w-6xl">
                  <Keys type="dark" onSelect={(dir) => handleDirection(dir)} />
                </div>
              </div>
            )}
            {/* {image && <img src={image} className="w-full h-full object-cover z-auto" />} */}
            {(gallery || image) && (
              <Slider {...settings} ref={sliderRef}>
                {image && <img
                  src={image}
                  className="w-full h-full object-cover z-auto max-h-16 md:max-h-32 w-auto"
                />}
                {gallery?.map((item, i) => (
                  <img
                    src={item.fields.file.url}
                    key={i}
                    className="h-full object-cover z-auto max-h-16 md:max-h-32 w-auto"
                  />
                ))}
              </Slider>
            )}
          </div>
        )}

        {video && (
          <div className="overflow-hidden md:mb-2 h-24 md:h-40 relative">
            {asPath == "/" && (
              <>
                <div className="absolute top-0 left-0 w-full z-10 h-full flex justify-center items-center px-0.5 md:px-2 flex-col">
                  <div className="container m-auto max-w-4xl text-center">
                    <h1 className="text-3xl md:text-5xl text-white font-title uppercase mb-1 leading-snug md:leading-normal">
                      Britain's Finest <br />
                      Timber Windows & Doors
                    </h1>
                    <h2 className="text-lg md:text-2xl text-white font-heading leading-normal">
                      Established in 1954 Mumford & Wood has since become the
                      UK’s premier manufacturer of high quality timber windows
                      and doors.
                    </h2>
                    <div
                      className="text-md md:text-2xl text-white font-heading leading-normal mt-2 items-center flex justify-center space-x-1 hover:opacity-80 cursor-pointer"
                      onClick={() => setVideoShowing(true)}
                    >
                      <img src="img/play.svg" alt="Play" />{" "}
                      <span>Watch video (2m 12s)</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full bg-neutral-0 z-0 absolute top-0 left-0 bg-opacity-80 opacity-100 flex justify-center items-center cursor-pointer" />
              </>
            )}
            <video
              className="md:w-full h-full object-cover z-auto"
              autoPlay
              muted
              loop
            >
              <source
                src={video}
                type="video/mp4"
                className="md:w-full h-full object-cover z-auto"
              />
            </video>
          </div>
        )}
        <div
          className={`container m-auto max-w-6xl relative ${
            border &&
            "p-1 pt-2 md:p-2 md:-mt-2 bg-white border-t-4 border-primary-base border-solid shadow-container xl:rounded-md"
          }`}
        >
          {sidebarType !== "none" ? (
            <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0 flex">
              <div className="lg:w-3/4">{children}</div>
              <div className="lg:w-1/4">
                <div className="top-9 sticky">
                  <div className="bg-primary-neutral rounded-md p-1.5 mb-0.5">
                    {sidebarType == "estimate" && (
                      <RequestEstimate
                        cta
                        onCtaClick={() => setModalOpen(true)}
                      />
                    )}
                    {sidebarType == "brochure" && (
                      <DownloadBrochure
                        cta
                        onCtaClick={() => setModalOpen(true)}
                      />
                    )}
                    {sidebarType == "apprenticeship" && (
                      <Apprenticeship
                        cta
                        onCtaClick={() => setModalOpen(true)}
                      />
                    )}
                  </div>
                  <Link href="/contact-us">
                    <Button size="default" style="tertiary">
                      Contact us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <div className="container m-auto flex-col px-1 md:flex-row md:gap-2 md:px-0">
                {children}
              </div>
            </motion.div>
          )}
        </div>
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Layout;

Layout.defaultProps = {
  header: true,
  sidebarType: "estimate",
  id: Math.random().toString(),
};
