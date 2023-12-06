import mongoose from "mongoose";
const schema = {
  User: mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      DOB: {
        type: Date,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  ),
  Events: mongoose.Schema(
    {
      name: {
        type: String,
        requried: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        requried: true,
      },
    },
    { timestamps: true }
  ),
};
const User = mongoose.model("user", schema.User);
const events = mongoose.model("event", schema.Events);
export { User, events };
