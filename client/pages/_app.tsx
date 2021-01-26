import React from "react";
import "../styles/global.css";
import "../styles/ckeditor.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
