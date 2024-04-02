const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
  resetPassword,
  userDetails
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const Enums = require("../utils/Enums");
const { uploadMiscDocuments, uploadGstDocuments, uploadItrDocuments } = require("../controllers/documentController");
const router = express.Router();
const multer = require('multer')
const upload = multer()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// Admin Routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles(Enums.USER_ROLES.ADMIN), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, userDetails); // removed the admin auth from here because by mistake this API is being used in the customer app
router.route("/admin/user/:id/reset_password").post(isAuthenticatedUser, authorizeRoles(Enums.USER_ROLES.ADMIN), resetPassword);
router.route("/admin/user/:id/misc/new").post(isAuthenticatedUser, authorizeRoles(Enums.USER_ROLES.ADMIN), upload.any(), uploadMiscDocuments)
router.route("/admin/user/:id/gst/new").post(isAuthenticatedUser, authorizeRoles(Enums.USER_ROLES.ADMIN), upload.any(), uploadGstDocuments)
router.route("/admin/user/:id/itr/new").post(isAuthenticatedUser, authorizeRoles(Enums.USER_ROLES.ADMIN), upload.any(), uploadItrDocuments)

module.exports = router;
