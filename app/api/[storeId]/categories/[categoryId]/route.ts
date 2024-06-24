import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;
    console.log(billboardId);
    if (!billboardId)
      return new NextResponse("Billboard not found", { status: 404 });

    const billboardsRef = collection(db, "billboards");
    const billboardRef = doc(billboardsRef, billboardId);

    const res = (await getDoc(billboardRef)).data();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDID_GET]", error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, billboardId } = params;
    const body = await req.json();
    const { label, image_url } = body;

    if (!label) return new NextResponse("Label is required", { status: 400 });

    const billboardsRef = collection(db, "billboards");
    const billboardRef = doc(billboardsRef, billboardId);

    updateDoc(billboardRef, {
      label,
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.log("[BILLBOARD_PATCH_UPDATE]", error);
      return new NextResponse("Internal error", { status: 500 });
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, billboardId } = params;

    if (!billboardId)
      return new NextResponse("Billboard not found", { status: 404 });
    if (!storeId) return new NextResponse("Store not found", { status: 404 });

    const billboardsRef = collection(db, "billboards");
    const billboardRef = doc(billboardsRef, billboardId);

    // Await the setDoc call
    await deleteDoc(billboardRef).catch((error) => {
      console.log("[BILLBOARD_DELETE_DELETEDOC]", error);
      return new NextResponse("Internal error", { status: 500 });
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
  }
}
