import { aysncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
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

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // on save it requires all the fields back again if I dont use validateBeforeSave

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

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

const loginUser = aysncHandler(async (req, res) => {
  // accquire data from req.body
  // username passs or email-pass whatever is the type
  // find the user if user exist
  // match the password
  // generate access and refresh token for future
  // send via cookies

  // console.log(req);
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist, please register");
  }
  const isPasswordValid = await user.isPasswordCorrect(password); // we cannot use the mongoose object for using our custom methods like is password correct, generate access and refresh token so we must user(database object)
  if (!isPasswordValid) {
    throw new ApiError(401, "Passsword incorrect");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  // the tokens i recieve are from the reference to the user object of the user which was called in generateTokens not updated in user of current function updatation is not done in the user object of current function so call it again after tokens generated

  const loggedinUser = await User.findById(user._id).select(
    // select can only be used while querying not when the object is retrieved and saved
    // query
    "-password -refreshToken"
  );

  const options = {
    // these options allow them to modify the cookies only by the server not by frontend (non modifiable on serverside)
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          // we send tokens again back because we are handling a edgecase where user himself want to set it maybe in local storage or what if the user is calling from mobile application there cookie system doesn't work
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User Logged in Successfully"
      )
    );
});

const logoutUser = aysncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true, // if i don't set this, i will get the old value without update.
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggedout"));
});

const refreshAccessToken = aysncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request"); // token either expired or doesn't exist
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "invalid token ");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newrefreshToken } = await generateTokens(user?._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };

//Controllers encapsulate the core business logic required to process incoming requests and generate appropriate responses. This includes tasks like data validation, interacting with databases (via models), performing calculations, and preparing data for the client
// route redirect to run a logic that logic is inside the controller
