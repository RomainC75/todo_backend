const { Schema, model } = require("mongoose");
import { UserInterface } from "../@types/user.type";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
