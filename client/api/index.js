const API = new Fetch("http://localhost:3000", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;
