import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  strokeStatus: {
    type: String,
  },
});

export const DataModel = mongoose.model("data", DataSchema);
