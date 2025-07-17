const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Yooo");
});

app.get("/hey", (req, res) => {
  res.send("TO1");
});

app.listen(PORT, () => {
  console.log("express at this port", process.env.PORT);
});
