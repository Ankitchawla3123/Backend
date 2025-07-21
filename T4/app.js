const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

// status code set
// app.get("/{*splat}", (req, res) => {
//   res.status(404).send("error404");
// });

app.use("/hey",  (req, res) => {
  // This works and this ends the request-response cycle
  res.send("Hello");

  // However, it does not exit the function so this will still run
  console.log("will still run!!");

  // This will then throw an error that we cannot send again after sending to the client already
  res.send("Bye");
});

app.listen(PORT, () => {
  console.log("express at this port", process.env.PORT);
});
