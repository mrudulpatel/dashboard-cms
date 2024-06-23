"use server";


import { connectToDB } from "../mongoose";
import Store from "../models/store.model";
import { auth } from "@clerk/nextjs/server";
import Billboard from "../models/billboard.model";
import { AddBillboardData, BillboardFormValues, BillboardType } from "@/index";

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
    console.log(stores);
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

    const billboards = await Billboard.find({ storeId }).lean();

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
