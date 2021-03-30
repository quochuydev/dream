import React from "react";

export default function Admin({ session }) {
  return <div>{JSON.stringify(session)}</div>;
}
