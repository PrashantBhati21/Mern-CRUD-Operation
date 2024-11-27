const mongoose = require("mongoose");

//Create Schema
const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
    },
    age: {
      type: Number,
      required: [true, "Age is Required"],
    },
  },
  { timestamps: true }
);

//Create Model
const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;
