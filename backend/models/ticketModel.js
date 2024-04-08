const mongoose = require("mongoose");
const Enums = require("../utils/Enums");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      maxLength: [40, "Title cannot exceed 70 characters"],
    },
    message: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: Enums.TICKET_STATUS.NEW,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
