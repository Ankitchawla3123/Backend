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

app.get("/messages", (req, res) =>
  res.send("This is where you can see any messages.")
);

// paths
// both message and messages will work in below example
app.get("/message{s}", (req, res) =>
  res.send("This is where you can see any messages.")
);

app.get("/hey{/yo}/how", (req, res) => {
  res.send(
    "Path check for hey{/yo}/how will work for both hey/how and also hey/yo/how "
  );
});

// must be at last as order matters
app.get("/{*splat}", (req, res) => {
  res.send("error 404 ");
});

app.listen(PORT, () => {
  console.log("express at this port", process.env.PORT);
});
