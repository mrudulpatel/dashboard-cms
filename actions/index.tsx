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

export async function getStore(storeId: string) {
  if (!storeId) return null;
  const docRef = doc(db, "stores", storeId);
  return (await getDoc(docRef)).data() as Store;
}

export async function getStoreByUserId(userId: string) {
  if (!userId) return null;
  const colRef = collection(db, "stores");
  const q = query(colRef, where("userId", "==", userId), limit(1));
  return (await getDocs(q)).docs[0]?.data();
}

export async function getAllStoresByUserId(userId: string) {
  if (!userId) return null;
  const colRef = collection(db, "stores");
  const q = query(colRef, where("userId", "==", userId));
  return (await getDocs(q)).docs.map((doc) => doc.data() as Store);
}

export async function getBillboard(storeId: string, billboardId: string) {
  if (!storeId || !billboardId) return null;
  const docRef = doc(db, `billboards/${billboardId}`);
  const data = (await getDoc(docRef)).data();
  return data as Billboard;
}

export async function getBillboards(storeId: string) {
  if (!storeId) return null;
  const colRef = collection(db, "billboards");
  const q = query(
    colRef,
    where("storeId", "==", storeId),
    orderBy("createdAt", "desc")
  );
  console.log(q);
  const billboards = (await getDocs(q)).docs;
  return billboards.map((doc) => doc.data() as Billboard);
}
