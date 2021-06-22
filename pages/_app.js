import { AnimatePresence } from "framer-motion";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/ApolloClient";
import { Router } from "next/router";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/slider.css";

function MyApp({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps);
  const loadingRef = useRef(null);

  useEffect(() => {
    //   setTimeout(() => {
    //     import('react-gtm-module').then((module) => {
    //       let TagManager = module;
    //       TagManager.initialize(tagManagerArgs);
    //     });
    //   }, 250);

    const startLoading = () => {
      // Start the loading bar
      loadingRef && loadingRef.current.continuousStart();
    };
    const endLoading = () => {
      // Tell the loader to finish up
      loadingRef && loadingRef.current.complete();
    };
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", endLoading);
    Router.events.on("routeChangeError", endLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", endLoading);
      Router.events.off("routeChangeError", endLoading);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <LoadingBar color="#007366" ref={loadingRef} />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ApolloProvider>
  );
}

export default MyApp;
