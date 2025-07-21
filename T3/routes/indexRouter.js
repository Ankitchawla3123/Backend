const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("index router group homme");
});

indexRouter.get("/about", (req, res) => {
  res.send("about");
});

indexRouter.get("/contact", (req, res) => {
  res.send("contact");
});



module.exports = indexRouter;
