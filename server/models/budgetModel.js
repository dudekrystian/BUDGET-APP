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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
