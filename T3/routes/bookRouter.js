const { Router } = require("express");

const bookRouter = Router();

bookRouter.get("/", (req, res) => {
  res.send("book router group");
});

bookRouter.get("/:bookid", (req, res) => {
  const { bookid } = req.params;
  res.send(`bookid Router group with book id ${bookid}`);
});

bookRouter.get("/:bookid/reserves", (req, res) => {
  const { bookid } = req.params;
  res.send(`reserver tab in book Router group with book id ${bookid}`);
});

module.exports = bookRouter;
