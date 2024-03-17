const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Document = require("../models/documentModel");
const { uploadFile } = require("../services/googleAPIs");

// Upload a Misc Document to Google Drive
exports.uploadMiscDocuments = catchAsyncErrors(async (req, res, next) => {
  const { files } = req;
  const { name } = req.body;
  const id = req.params.id;

  if (files.length === 0) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  let { fileUrl } = await uploadFile(
    files[0],
    process.env.MISC_FOLDER_ID
  );

  let miscDoc = { name, url: fileUrl };
  let userDocument = await Document.findOne({ userId: id });

  if (!userDocument) {
    userDocument = await Document.create({
      userId: id,
      user_documents: {
        misc: [miscDoc],
      },
    });
  } else {
    userDocument.user_documents.misc.push(miscDoc);
    userDocument.save();
  }

  res.status(200).json({
    success: true,
    message: "File Uploaded",
    documents: userDocument.user_documents,
  });
});

// Upload a GST Document to Google Drive
exports.uploadGstDocuments = catchAsyncErrors(async (req, res, next) => {
  const { files } = req;
  const { name } = req.body;
  const id = req.params.id;

  if (files.length === 0) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  let { fileUrl } = await uploadFile(
    files[0],
    process.env.GST_FOLDER_ID
  );

  let gstDoc = { name, url: fileUrl };
  let userDocument = await Document.findOne({ userId: id });

  if (!userDocument) {
    userDocument = await Document.create({
      userId: id,
      user_documents: {
        gst: [gstDoc],
      },
    });
  } else {
    userDocument.user_documents.gst.push(gstDoc);
    userDocument.save();
  }

  res.status(200).json({
    success: true,
    message: "File Uploaded",
    documents: userDocument.user_documents,
  });
});

// Upload a ITR Document to Google Drive
exports.uploadItrDocuments = catchAsyncErrors(async (req, res, next) => {
  const { files } = req;
  const { name } = req.body;
  const id = req.params.id;

  if (files.length === 0) {
    return next(new ErrorHandler("Please upload a file", 400));
  }

  let { fileUrl } = await uploadFile(
    files[0],
    process.env.ITR_FOLDER_ID
  );

  let itrDoc = { name, url: fileUrl };
  let userDocument = await Document.findOne({ userId: id });

  if (!userDocument) {
    userDocument = await Document.create({
      userId: id,
      user_documents: {
        itr: [itrDoc],
      },
    });
  } else {
    userDocument.user_documents.itr.push(itrDoc);
    userDocument.save();
  }

  res.status(200).json({
    success: true,
    message: "File Uploaded",
    documents: userDocument.user_documents,
  });
});
