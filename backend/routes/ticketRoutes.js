const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createTicket,
  getAllTickets,
  updateTicketStatus,
  getAllTicketsOfUser,
  getTicketInfo,
} = require("../controllers/ticketController");
const Enums = require("../utils/Enums");
const router = express.Router();

router.route("/ticket/new").post(isAuthenticatedUser, createTicket);
router.route("/ticket/user/all").get(isAuthenticatedUser, getAllTicketsOfUser);

router
  .route("/admin/ticket/all")
  .get(
    isAuthenticatedUser,
    authorizeRoles(Enums.USER_ROLES.ADMIN),
    getAllTickets
  );
router
  .route("/admin/ticket/update/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles(Enums.USER_ROLES.ADMIN),
    updateTicketStatus
  );
router
  .route("/admin/ticket/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles(Enums.USER_ROLES.ADMIN),
    getTicketInfo
  );

module.exports = router;
