import Router from "next/router";

export default function Authetication() {
  return (
    <>
      <h1>401</h1>
      <a
        onClick={() => {
          Router.push(`/`);
        }}
      >
        Home
      </a>
    </>
  );
}
