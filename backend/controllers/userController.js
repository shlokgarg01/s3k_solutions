const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const sendToken = require("../utils/jwtToken");
const Enums = require("../utils/Enums");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, contactNumber } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    contactNumber,
  });
  sendToken(user, 201, res);
});

// Edit User Profile except Password
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("No User Found!", 400));
  }

  const { name, email } = req.body;
  user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res.status(200).json({
    success: true,
    message: "User updated!",
    user,
  });
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { contactNumber, password } = req.body;
  if (!contactNumber || !password) {
    return next(
      new ErrorHandler("Please enter Contact Number & Password", 400)
    );
  }

  const user = await User.findOne({ contactNumber }).select("+password"); // select password is needed bcz we have specified select: false on password in the model
  if (!user) {
    return next(new ErrorHandler("No user with this Contact Number.", 401));
  }

  if (user && user.token && user.role !== Enums.USER_ROLES.ADMIN) {
    // If user is already logged in on 1 device, then they cannot login again until Admin logs them out
    return next(
      new ErrorHandler(
        "You are already logged in on another device. Please contact Admin.",
        401
      )
    );
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Contact Number or Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  // res.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });
  let userId = req.params.id
  let user = await User.findById(userId)

  if (!user) {
    return next(new ErrorHandler("No user found!", 400));
  }

  user.token = "" // this will logout the user
  await user.save()

  res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

// get All Users -- Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
    usersCount: users.length,
  });
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  const { password } = req.body;
  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }
  user.password = password;

  await user.save();
  sendToken(user, 200, res);
});

// get user details& user documents
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  let userDocuments = await Document.findOne({ userId });
  if (!userDocuments) userDocuments = {};

  res.status(200).json({
    success: true,
    user,
    userDocuments: userDocuments?.user_documents || {
      gst: [],
      itr: [],
      misc: [],
    },
  });
});

// get All User Details for Admin Dashboard Home Page -- Admin
exports.getAdminDetails = catchAsyncErrors(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const allDocuments = await Document.find();

  let itrDocumentsCount = 0,
    gstDocumentsCount = 0,
    miscDocumentsCount = 0;

  for (let i = 0; i < allDocuments.length; ++i) {
    itrDocumentsCount += allDocuments[i].user_documents["itr"].length;
    gstDocumentsCount += allDocuments[i].user_documents["gst"].length;
    miscDocumentsCount += allDocuments[i].user_documents["misc"].length;
  }

  res.status(200).json({
    success: true,
    usersCount,
    totalDocuments: itrDocumentsCount + gstDocumentsCount + miscDocumentsCount,
    itrDocumentsCount,
    gstDocumentsCount,
    miscDocumentsCount,
  });
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
