import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      select: false,
      required: function () {
        return this.authProvider === "local";
      },
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

schema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

export const User = mongoose.models.User || model("User", schema);
