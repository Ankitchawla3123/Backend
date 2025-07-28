import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { aysncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// this is here to verify if user there or not
export const verifyJWT = aysncHandler(async (req, res, next) => {
  // only take access token
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // header to be set if not accessed by cookies and will send access token only , done via postman Authorization: Bearer <token>
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    ); // id was set during the model only so after decode we will get the id in response with other things which was set
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError("401", error?.message || "Inavalid access token");
  }
});

// now i can call this middleware for the user to exist by using app to use before the route hit
