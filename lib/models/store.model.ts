import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    bufferTimeoutMS: 10000000,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
