"use server";

import { connectToDB } from "../mongoose";
import Store from "../models/store.model";
import { auth } from "@clerk/nextjs/server";
import Billboard from "../models/billboard.model";
import CategoryModel from "../models/category.model";
import { CategoryFormValues } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/CategoriesForm";
import Sizes from "../models/size.model";
import Colors from "../models/color.model";
import { SizesFormValues } from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/_components/SizesForm";
import { ColorsFormValues } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/_components/ColorForm";

export async function getStore(storeId: string) {
  if (!storeId) return null;
  try {
    connectToDB();
    const store = Store.findOne({ _id: storeId });

    if (!store) return null;

    return store;
  } catch (error) {
    console.log("[GET_STORE_M]", error);
  }
}

export async function getStoreByUserId(userId: string) {
  if (!userId) return null;
  try {
    connectToDB();

    const store = Store.findOne({ userId }).lean();

    if (!store) return null;

    return store;
  } catch (error) {
    console.log("[GET_STORE_BY_USER]", error);
  }
}

export async function getAllStoresByUserId(userId: string) {
  if (!userId) return null;

  try {
    connectToDB();

    const stores = Store.find({ userId }).lean();

    if (!stores) return null;

    return stores;
  } catch (error) {
    console.log("[GET_ALL_STORES_BY_USER]", error);
  }
}

export async function addStore(data: any) {
  if (!data) return null;
  try {
    const { userId } = auth();

    connectToDB();
    console.log(data);
    const store = new Store({
      name: data.name,
      userId,
    });

    const savedStore = await store.save();

    console.log(savedStore);

    if (!savedStore) return null;

    return JSON.stringify(savedStore);
  } catch (error) {
    console.log("[ADD_STORE]", error);
  }
}

export async function updateStore(data: any, id: string) {
  if (!data) return null;
  try {
    connectToDB();

    const { userId } = auth();

    const store = {
      name: data.name,
    };

    const updatedStore = await Store.findOneAndUpdate(
      { _id: id, userId },
      store
    ).lean();

    if (!updatedStore) return null;

    return updatedStore;
  } catch (error) {
    console.log("[UPDATE_STORE]", error);
  }
}

export async function getBillboard(
  storeId: string,
  billboardId: string
): Promise<BillboardType | null> {
  if (!storeId || !billboardId) return null;

  try {
    await connectToDB();

    const billboard = await Billboard.findOne({
      _id: billboardId,
      storeId,
    }).lean();

    if (!billboard) return null;
    console.log(billboard);
    return billboard as BillboardType; // Ensure the returned object conforms to the BillboardType
  } catch (error) {
    console.log("[GET_BILLBOARD]", error);
    return null;
  }
}

export async function getBillboards(storeId: string) {
  if (!storeId) return null;
  try {
    connectToDB();

    const billboards = await Billboard.find({ storeId });

    if (!billboards) return null;

    console.log(billboards);

    return billboards;
  } catch (error) {
    console.log("[GET_BILLBOARDS]", error);
  }
}

export async function addBillboard(
  data: AddBillboardData
): Promise<BillboardType | null> {
  if (!data) return null;

  try {
    await connectToDB();

    const billboard = new Billboard({
      label: data.label,
      storeId: data.storeId,
    });

    const savedBillboard = await billboard.save();

    if (!savedBillboard) return null;

    // Convert the savedBillboard to the expected type
    return savedBillboard.toObject() as BillboardType;
  } catch (error) {
    console.log("[ADD_BILLBOARD]", error);
    return null;
  }
}

export async function updateBillboard(
  billboardId: string,
  data: BillboardFormValues
): Promise<BillboardType | null> {
  if (!billboardId || !data) return null;

  try {
    await connectToDB();

    const updatedBillboard = await Billboard.findByIdAndUpdate(
      billboardId,
      data,
      { new: true }
    ).lean();

    if (!updatedBillboard) return null;

    return updatedBillboard as BillboardType;
  } catch (error) {
    console.log("[UPDATE_BILLBOARD]", error);
    return null;
  }
}

export async function deleteBillboard(billboardId: string) {
  if (!billboardId) return null;

  try {
    await connectToDB();

    await Billboard.findByIdAndDelete(billboardId);

    return true;
  } catch (error) {
    console.log("[DELETE_BILLBOARD]", error);
    return null;
  }
}

export async function getCategories(storeId: string) {
  if (!storeId) return null;
  try {
    connectToDB();

    const categories = await CategoryModel.find({ storeId })
      .lean()
      .populate("billboardId", "label");

    if (!categories) return null;

    console.log(categories);

    return categories;
  } catch (error) {
    console.log("[GET_CATEGORIES]", error);
  }
}

export async function getCategory(
  categoryId: string
): Promise<Category | null | undefined> {
  if (!categoryId) return null;
  try {
    connectToDB();

    const category = await CategoryModel.findOne({ _id: categoryId }).lean();

    if (!category) return null;

    console.log(category);

    // Manually assert the type of the result
    return category as Category;
  } catch (error) {
    console.log("[GET_CATEGORY]", error);
    return undefined;
  }
}

export async function addCategory(
  data: AddCategoryData
): Promise<Category | null> {
  if (!data) return null;

  try {
    await connectToDB();

    const category = new CategoryModel({
      name: data.name,
      storeId: data.storeId,
      billboardId: data.billboardId,
    });

    const savedCategory = await category.save();

    if (!savedCategory) return null;

    // Convert the savedCategory to the expected type
    return savedCategory.toObject() as Category;
  } catch (error) {
    console.log("[ADD_CATEGORY]", error);
    return null;
  }
}

export async function updateCategory(
  categoryId: string,
  data: CategoryFormValues
): Promise<Category | null> {
  if (!categoryId || !data) return null;

  try {
    await connectToDB();

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      data,
      {
        new: true,
      }
    ).lean();

    if (!updatedCategory) return null;

    return updatedCategory as Category;
  } catch (error) {
    console.log("[UPDATE_CATEGORY]", error);
    return null;
  }
}

export async function deleteCategory(categoryId: string) {
  if (!categoryId) return null;

  try {
    await connectToDB();

    await CategoryModel.findByIdAndDelete(categoryId);

    return true;
  } catch (error) {
    console.log("[DELETE_CATEGORY]", error);
    return null;
  }
}

export async function getSizes(storeId: string) {
  if (!storeId) return null;
  try {
    connectToDB();

    const sizes = await Sizes.find({ storeId });

    if (!sizes) return null;

    console.log(sizes);

    return sizes;
  } catch (error) {
    console.log("[GET_SIZES]", error);
  }
}

export async function getSize(
  sizeId: string
): Promise<Size | null | undefined> {
  if (!sizeId) return null;
  try {
    connectToDB();

    const size = await Sizes.findOne({ _id: sizeId }).lean();

    if (!size) return null;

    console.log(size);

    // Manually assert the type of the result
    return size as Size;
  } catch (error) {
    console.log("[GET_SIZE]", error);
    return undefined;
  }
}

export async function addSize(
  data: AddSizeData
): Promise<Size | null> {
  if (!data) return null;

  try {
    await connectToDB();

    const size = new Sizes({
      name: data.name,
      storeId: data.storeId,
      value: data.value,
    });

    const savedSize = await size.save();

    if (!savedSize) return null;

    // Convert the savedSize to the expected type
    return savedSize.toObject() as Size;
  } catch (error) {
    console.log("[ADD_SIZE]", error);
    return null;
  }
}

export async function updateSize(
  sizeId: string,
  data: SizesFormValues
): Promise<Size | null> {
  if (!sizeId || !data) return null;

  try {
    await connectToDB();

    const updatedSize = await Sizes.findByIdAndUpdate(
      sizeId,
      data,
      {
        new: true,
      }
    ).lean();

    if (!updatedSize) return null;

    return updatedSize as Size;
  } catch (error) {
    console.log("[UPDATE_SIZE]", error);
    return null;
  }
}

export async function deleteSize(sizeId: string) {
  if (!sizeId) return null;

  try {
    await connectToDB();

    await Sizes.findByIdAndDelete(sizeId);

    return true;
  } catch (error) {
    console.log("[DELETE_SIZE]", error);
    return null;
  }
}
export async function getColors(storeId: string) {
  if (!storeId) return null;
  try {
    connectToDB();

    const colors = await Colors.find({ storeId });

    if (!colors) return null;

    console.log(colors);

    return colors;
  } catch (error) {
    console.log("[GET_COLORS]", error);
  }
}

export async function getColor(
  colorId: string
): Promise<Color | null | undefined> {
  if (!colorId) return null;
  try {
    connectToDB();

    const color = await Colors.findOne({ _id: colorId }).lean();

    if (!color) return null;

    console.log(color);

    // Manually assert the type of the result
    return color as Color;
  } catch (error) {
    console.log("[GET_COLOR]", error);
    return undefined;
  }
}

export async function addColor(
  data: AddColorData
): Promise<Color | null> {
  if (!data) return null;

  try {
    await connectToDB();

    const color = new Colors({
      name: data.name,
      storeId: data.storeId,
      value: data.value,
    });

    const savedColor = await color.save();

    if (!savedColor) return null;

    // Convert the savedColor to the expected type
    return savedColor.toObject() as Color;
  } catch (error) {
    console.log("[ADD_COLOR]", error);
    return null;
  }
}

export async function updateColor(
  colorId: string,
  data: ColorsFormValues
): Promise<Size | null> {
  if (!colorId || !data) return null;

  try {
    await connectToDB();

    const updatedColor = await Colors.findByIdAndUpdate(
      colorId,
      data,
      {
        new: true,
      }
    ).lean();

    if (!updatedColor) return null;

    return updatedColor as Size;
  } catch (error) {
    console.log("[UPDATE_COLOR]", error);
    return null;
  }
}

export async function deleteColor(colorId: string) {
  if (!colorId) return null;

  try {
    await connectToDB();

    await Colors.findByIdAndDelete(colorId);

    return true;
  } catch (error) {
    console.log("[DELETE_COLOR]", error);
    return null;
  }
}
