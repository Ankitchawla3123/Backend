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

//params
app.get("/:username/messages", (req, res) => {
  res.send(`username ${req.params.username}`); // in object format
});

app.get("/:username/messages/:messageid", (req, res) => {
  console.log(req.params);
  res.send("will be in object format");
});

// query params ? denotes the start of it

// not actual path but more like an argument
// these are seperated by the & symbol and they act as key value pairs

// http://localhost:5173/dasda/queryparam?key=hello&anotherkey=yo&sort=date&direction=ascending&sort=anothersortwillbeinanarray
app.get("/:username/queryparam", (req, res) => {
  console.log(req.query);
  res.send("check the console to see if any query params ");
});

// additional chekc for self use
app.get("{/:username}/uniquepathcheck", (req, res) => {
  res.send(
    `unique path exist with username ${
      req.params.username !== undefined ? req.params.username : "no usrename"
    }`
  );
});



// must be at last as order matters
app.get("/{*splat}", (req, res) => {
  res.send("error 404 ");
});

app.listen(PORT, () => {
  console.log("express at this port", process.env.PORT);
});
