import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
  },
  {
    timestamps: true,
  }
);

const Colors = mongoose.models.Colors || mongoose.model("Colors", colorSchema);

export default Colors;
