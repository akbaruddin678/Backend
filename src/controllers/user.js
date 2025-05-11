const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { User } = require("../models/user");
console.log("User model:", User); // Debugging: Check if User model is loaded correctly
const { ApiResponse } = require("../utils/ApiResponse");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    console.log("Generating tokens for userId:", userId); // Debugging: Track userId being processed
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found"); // Debugging: Check if user is found
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log("Generated tokens:", { accessToken, refreshToken }); // Debugging: Check generated tokens

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generating tokens:", error); // Debugging: Log error
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login attempt received for:", email); // Debugging: Track login attempts

  if (!email || !password) {
    console.log("Missing email or password"); // Debugging: Log missing field
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    console.log("User not found for email:", email); // Debugging: Log user not found
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    // console.log("Invalid password for user:", email); // Debugging: Log invalid password attempt
    throw new ApiError(401, "Invalid user credentials");
  }

  // const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
  //   user._id
  // );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("Logged-in user:", loggedInUser); // Debugging: Verify the logged-in user's data

  // const options = {
  //   httpOnly: true,
  //   secure: true,
  // };

  return (
    res
      .status(200)
      // .cookie("accessToken", accessToken, options)
      // .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: {
              _id: loggedInUser._id,
              email: loggedInUser.email,
              role: loggedInUser.role,
            },
            // accessToken,
            // refreshToken,
          },
          "User logged In Successfully"
        )
      )
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  // console.log("Incoming refresh token:", incomingRefreshToken); // Debugging: Log incoming refresh token

  if (!incomingRefreshToken) {
    console.log("No refresh token provided"); // Debugging: Log missing refresh token
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // console.log("Decoded token:", decodedToken); // Debugging: Log decoded token

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      console.log("User not found for refresh token"); // Debugging: Log user not found for refresh token
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      // console.log("Refresh token mismatch or expired"); // Debugging: Log token mismatch
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);
    // console.log("Generated new tokens:", { accessToken, newRefreshToken }); // Debugging: Log new tokens

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    // console.error("Error in refreshing access token:", error); // Debugging: Log error during token refresh
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

module.exports = {
  loginUser,
  refreshAccessToken,
};
