const mongoose = require("mongoose");
// schema model in the db

const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    max: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
