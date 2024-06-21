import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId } = params;
    const body = await req.json();
    const { name } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const storesRef = collection(db, "stores");
    const storeRef = doc(storesRef, storeId);

    // Await the setDoc call
    updateDoc(storeRef, {
      name,
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.log("[STORE_PATCH_SET]", error);
      return new NextResponse("Internal error", { status: 500 });
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[STORE_PATCH]", error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId } = params;

    const storesRef = collection(db, "stores");
    const storeRef = doc(storesRef, storeId);

    // Await the setDoc call
    await deleteDoc(storeRef).catch((error) => {
      console.log("[STORE_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[STORE_DELETE]", error);
  }
}
