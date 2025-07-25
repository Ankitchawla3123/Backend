const { Router } = require("express");

const authorRouter = Router();

authorRouter.get("/", (req, res) => {
  res.send("author router group");
});

authorRouter.get("/:authorid", (req, res) => {
  const { authorid } = req.params;
  res.send(`Author Router group with author id ${authorid}`);
});


module.exports = authorRouter;
