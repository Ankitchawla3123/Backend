import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // middleware before the request comes we can see it intercepts app.use
// we can also configure cors

app.use(express.json({ limit: "16kb" })); // imp
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // imp
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";

//router declartion
app.use("/api/v1/users", userRouter);

export { app };
