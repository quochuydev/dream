class Route {
  constructor(server) {
    this.server = server;
    this.req = null;
    this.res = null;
  }

  addRoute(route, func) {
    for (let key in func) {
      this.server[key](route, async (req, res) => {
        try {
          func.res = res;
          func.req = req;
          func.body = req.body;
          func.params = req.params;
          func.query = req.query;
          const result = await func[key]();
          res.json(result);
        } catch (error) {
          res.status(400).send(error);
        }
      });
    }
  }
}

module.exports = { Route };
