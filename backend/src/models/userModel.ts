import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: "string",
      unique: true,
      required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    gender: {
        type: "string",
        required: true,
        enum: ["male", "female"]
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema)

export default User;