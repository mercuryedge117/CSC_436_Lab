const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {type: String, required: true},
  dateCreated: { type: String, required: true },
  complete: { type: Boolean, required: true },
  dateCompleted: { type: String },
  authorID: { type: Schema.Types.ObjectId, ref: "User" },
});

//Export model
module.exports = mongoose.model("Todo", PostSchema);
