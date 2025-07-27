import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlware.js";

const userRouter = Router();

// users/register
userRouter.route("/register").post(
  upload.fields([
    // middleware
    {
      name: "avatar", // should be in front end also
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
); //could use userrouter.get put post etc

userRouter.route("/login").post(loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser); // my req would have user as an object with it injected by the middleware

// userRouter.route("/update").put()

export default userRouter;
// if exported as export {userRouter} then to be imported as import {userRouter}
// if exported as default then to imported as userRouter

// here asynchandler as call back is actuall logic which is performed by controller in different file
// user controller have different kind of logic to be implemented on user that can be called on different routes

// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));
