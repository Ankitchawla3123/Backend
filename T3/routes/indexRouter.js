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

// this is the common js method of module.exports 
// if i change it from package file it will be export and import statement rather than require
