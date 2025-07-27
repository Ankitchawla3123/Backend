import { aysncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// use case of aysnc handler  in destructured format / raw
// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));

// const registerUser = aysncHandler(async (req, res) => {
// //   console.log("recieveing req");
//   res.status(200).json({ // status is decided by us
//     message: "ok",
//   });
// });

const registerUser = aysncHandler(async (req, res) => {
  // get user details(data)
  // validation - not empty
  // check if user already exist: username or email
  // check files(avatar--required and coverimage)
  // upload them to cloudinary -- wait for response before register
  // we need to create user object -- creation call to create entry in db
  // once the user is created we get a return of response we need to hide pass in that even though encrypted
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { username, fullname, email, password } = req.body;
  if (
    [username, email, password, fullname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required");
  }

  const existedUser = await User.findOne({
    // could make seperate also
    $or: [{ username }, { email }],
  }); // i can directly put username in there but we will use operator

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exist");
  }

  const avatarLocalpath = req.files?.avatar[0]?.path; // by multer
  const coverimageLocalpath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath);
  let coverimage = null;
  if (coverimageLocalpath) {
    coverimage = await uploadOnCloudinary(coverimageLocalpath);
  }

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required(upload failed)");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // unselected ones
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registeration");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };

//Controllers encapsulate the core business logic required to process incoming requests and generate appropriate responses. This includes tasks like data validation, interacting with databases (via models), performing calculations, and preparing data for the client
// route redirect to run a logic that logic is inside the controller
