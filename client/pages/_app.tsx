import React from "react";
import Router from "next/router";
import { CookiesProvider } from "react-cookie";

import Loading from "../components/Loading";

import "../styles/global.css";
import "../styles/ckeditor.css";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <CookiesProvider>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </CookiesProvider>
    </>
  );
}
