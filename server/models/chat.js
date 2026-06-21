import mongoose, { Schema, model, Types } from "mongoose";


const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    groupChat: {
      type: Boolean,
      default: false,
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
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Chat = mongoose.models.Chat || model("Chat", schema);
