const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Ticket = require("../models/ticketModel");
const Enums = require("../utils/Enums");
const { populateUsers } = require("../services/TicketService");
const {SortObjectByKeys} = require("../utils/Helpers.js")

// Create a new Query Ticket
exports.createTicket = catchAsyncErrors(async (req, res, next) => {
  const { title, message } = req.body;

  if (!title) {
    return next(new ErrorHandler("Title is required", 400));
  } else if (!message) {
    return next(new ErrorHandler("Message is required", 400));
  }

  let ticket = await Ticket.create({
    title,
    message,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Ticket created successfully",
    ticket
  });
});

// get all tickets grouped by status -- Admin
exports.getAllTickets = catchAsyncErrors(async (req, res, next) => {
  let data = await Ticket.aggregate([
    {
      $group: {
        _id: "$status",
        documents: { $push: "$$ROOT" }, // Storing all documents in each group
      },
    },
  ]);
  let tickets = await populateUsers(data);
  tickets = SortObjectByKeys(tickets)

  res.status(200).json({
    success: true,
    tickets,
  });
});

// get all User Tickets
exports.getAllTicketsOfUser = catchAsyncErrors(async (req, res, next) => {
  let tickets = await Ticket.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $group: {
        _id: "$status",
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  tickets = await populateUsers(tickets);

  res.status(200).json({
    success: true,
    tickets,
  });
});

// update status of a ticket -- Admin
exports.updateTicketStatus = catchAsyncErrors(async (req, res, next) => {
  let ticket_id = req.params.id;
  let { status } = req.body;

  let ticket = await Ticket.findById(ticket_id);
  if (!status) {
    return next(new ErrorHandler("Status is required", 400));
  } else if (!ticket) {
    return next(new ErrorHandler("No ticket found!", 400));
  }

  if (
    (ticket.status === Enums.TICKET_STATUS.NEW &&
      status === Enums.TICKET_STATUS.ACKNOWLEDGED) ||
    (ticket.status === Enums.TICKET_STATUS.ACKNOWLEDGED &&
      status === Enums.TICKET_STATUS.CLOSED)
  ) {
    ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      { status },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  } else if (ticket.status === Enums.TICKET_STATUS.CLOSED) {
    return next(new ErrorHandler("Ticket already closed", 400));
  } else {
    return next(new ErrorHandler("Invalid ticket status.", 400));
  }

  res.status(200).json({
    success: true,
    message: "Ticket updated",
    ticket,
  });
});

// get ticket Info -- Admin
exports.getTicketInfo = catchAsyncErrors(async (req, res, next) => {
  let ticket = await Ticket.findById(req.params.id).populate("user")
  if (!ticket) {
    return next(new ErrorHandler("Not such ticket found!", 400));
  }

  res.status(200).json({
    success: true,
    ticket,
  });
});
