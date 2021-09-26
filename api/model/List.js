const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "movie",
    },
    genre: {
      type: String,
    },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
