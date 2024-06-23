import mongoose, { Schema, Types } from "mongoose";

const billboardSchema = new Schema(
  {
    storeId: { type: Types.ObjectId, ref: "Store" },
    label: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Billboard = mongoose.models.Billboard || mongoose.model("Billboard", billboardSchema);

export default Billboard;
