import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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

userRouter.route("/refresh-token").post(refreshAccessToken); // if user get a failed login/ access token expired he should hit this point if response is not success then he should login again else he would have new refresh tokens
// to be handled in front end

userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);

userRouter.route("/current-user").get(verifyJWT, getCurrentUser);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);

userRouter
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

export default userRouter;
// if exported as export {userRouter} then to be imported as import {userRouter}
// if exported as default then to imported as userRouter

// here asynchandler as call back is actuall logic which is performed by controller in different file
// user controller have different kind of logic to be implemented on user that can be called on different routes

// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));
