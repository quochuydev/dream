import React from "react";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
