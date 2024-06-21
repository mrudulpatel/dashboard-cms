import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await request.json();
    const { name } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const storesRef = collection(db, "stores");
    const id = randomUUID();

    // Await the setDoc call
    await setDoc(doc(storesRef, id), {
      id,
      name,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.log("[STORES_POST_SET]", error);
      return new NextResponse("Internal error", { status: 500 });
    });

    // Return the NextResponse object directly
    return NextResponse.json({
      id,
      name,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
