const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    assignedDepartment: { type: String, required: true, trim: true },
    assignedToUserId: { type: String, required: true, trim: true },
    assignedToUserName: { type: String, required: true, trim: true },
    assignedToUserEmail: { type: String, required: true, trim: true },
    createdBy: { type: String, required: true, trim: true },
    createdDate: { type: Date, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("applications", applicationSchema);
