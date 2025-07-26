const { Router } = require("express");

const authorRouter = Router();

authorRouter.get("/", (req, res) => {
  res.send("author router group");
});

authorRouter.get("/:auid", (req, res) => {
  const { auid } = req.params;
  res.send(`Author Router group with author id ${auid}`);
});

module.exports = authorRouter;
