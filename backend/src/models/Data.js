import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: false,
  },
  gender: {
    type: String,
    required: true,
  },
  strokeStatus: {
    type: Boolean,
    required: true,
  },
});

export const DataModel = mongoose.model("data", DataSchema);
