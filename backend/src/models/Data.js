import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  strokeStatus: {
    type: String,
    required: true,
  },
});

export const DataModel = mongoose.model("data", DataSchema);
