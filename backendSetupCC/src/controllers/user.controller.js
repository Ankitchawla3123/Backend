import { aysncHandler } from "../utils/asyncHandler.js";

// use case of aysnc handler  in destructured format / raw
// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));

const registerUser = aysncHandler(async (req, res) => {
//   console.log("recieveing req");
  res.status(200).json({ // status is decided by us
    message: "ok",
  });
});

export { registerUser };

//Controllers encapsulate the core business logic required to process incoming requests and generate appropriate responses. This includes tasks like data validation, interacting with databases (via models), performing calculations, and preparing data for the client
// route redirect to run a logic that logic is inside the controller
