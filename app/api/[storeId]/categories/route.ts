import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await request.json();
    const { label } = body;

    if (!label) return new NextResponse("Label is required", { status: 400 });

    const billboardsRef = collection(db, "billboards");

    const id = randomUUID();

    // Await the setDoc call
    await setDoc(doc(billboardsRef, id), {
      id,
      label,
      userId,
      storeId: params.storeId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.log("[STORES_POST_SET]", error);
      return new NextResponse("Internal error", { status: 500 });
    });

    // Return the NextResponse object directly
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("Store not found", { status: 404 });

    console.log(params.storeId);
    const billboardsRef = collection(db, "billboards");
    const billboards: any[] = [];
    const q = query(billboardsRef, where("storeId", "==", params.storeId));

    // Await the promise returned by getDocs
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.data());
      billboards.push({ ...doc.data(), id: doc.id });
    });

    // Now this log will show the populated billboards array
    console.log(billboards);
    return Response.json({ billboards }, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
