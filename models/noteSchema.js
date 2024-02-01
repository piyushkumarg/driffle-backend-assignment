const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
