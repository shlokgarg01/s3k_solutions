const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = null
  if (token === null || token === undefined) {
    token = req.headers['authorization']
  }

  if(!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decodedData.id)

  // verifying that user should be signed in to one device only
  if (req.user.token !== token) {
    return next(new ErrorHandler("Please login..", 401))
  }

  next()
})

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
    }

    next()
  }
}