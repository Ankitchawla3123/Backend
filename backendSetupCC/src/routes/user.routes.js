import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

// users/register
userRouter.route("/register").post(registerUser); //could use userrouter.get put post etc

export default userRouter; // if exported as export {userRouter} then to be imported as import {userRouter}
// if exported as default then to imported as userRouter

// here asynchandler as call back is actuall logic which is performed by controller in different file
// user controller have different kind of logic to be implemented on user that can be called on different routes

// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));
