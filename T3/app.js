const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);

app.get("/{*splat}", (req, res) => {
  res.send("error 404 ");
});

app.listen(PORT, () => {
  console.log("express at this port", process.env.PORT);
});
