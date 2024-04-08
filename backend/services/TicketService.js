const User = require('../models/userModel')

/* 
  Format
  data = [
    {
      "_id": "closed",
      "documents": [
        {
          "_id": "66112e745548bf993fb65487",
          "title": "First Ticket",
          "message": "I want a new ITR copy, this one got lost",
          "status": "closed",
          "createdAt": "2024-04-06T11:13:56.927Z",
          "updatedAt": "2024-04-06T12:10:48.033Z",
          "__v": 0,
          "user": "65e54401221341faffef4402"
        }
      ]
    }
  ]
*/
const populateUsers = async (data) => {
  const referenceFields = data
    .map((group) => group.documents.map((doc) => doc.user.toString()))
    .flat();
  // Populate the referenced field
  const populatedField = await User.find({ _id: { $in: referenceFields } });

  // Constructing the desired object structure
  const groupedRecords = {};
  data.forEach((group) => {
    groupedRecords[group._id] = group.documents.map((doc) => {
      doc.user = populatedField.filter(
        (item) => item._id.toString() === doc.user.toString()
      );

      doc.user = doc.user[0] // since filter returns an array, we will always get 1 user, so storing that directly in the user column
      return doc;
    });
  });

  // grouping data by status
  const tickets = {};
  data.forEach((group) => {
    tickets[group._id] = group.documents;
  });

  return tickets
}

module.exports = {populateUsers}