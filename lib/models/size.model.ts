import mongoose, { Schema, Types } from "mongoose";

const SizesSchema = new Schema(
  {
    storeId: { type: Types.ObjectId, ref: "Store", required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

const Sizes = mongoose.models.Sizes || mongoose.model("Sizes", SizesSchema);

export default Sizes;
