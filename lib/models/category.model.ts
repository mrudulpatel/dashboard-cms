import mongoose, { Schema, Types } from "mongoose";

const categorySchema = new Schema(
  {
    storeId: { type: Types.ObjectId, ref: "Store" },
    billboardId: { type: Types.ObjectId, ref: "Billboard" },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
