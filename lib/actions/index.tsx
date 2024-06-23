"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { connectToDB } from "../mongoose";
import Store from "../models/store.model";
import { auth } from "@clerk/nextjs/server";

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

    const updatedStore = await Store.findOneAndUpdate({ _id: id, userId }, store).lean();

    if (!updatedStore) return null;

    return updatedStore;
  } catch (error) {
    console.log("[UPDATE_STORE]", error);
  }
}

export async function getBillboard(storeId: string, billboardId: string) {
  if (!storeId || !billboardId) return null;
  // const docRef = doc(db, `billboards/${billboardId}`);
  // const data = (await getDoc(docRef)).data();
  // return data as Billboard;

  try {
  } catch (error) {
    console.log("[GET_BILLBOARD]", error);
  }
}

export async function getBillboards(storeId: string) {
  // if (!storeId) return null;
  // const colRef = collection(db, "billboards");
  // const q = query(
  //   colRef,
  //   where("storeId", "==", storeId),
  //   orderBy("createdAt", "desc")
  // );
  // console.log(q);
  // const billboards = (await getDocs(q)).docs;
  // return billboards.map((doc) => doc.data() as Billboard);
}
