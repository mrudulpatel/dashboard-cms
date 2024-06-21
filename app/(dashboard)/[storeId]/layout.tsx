import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getStore } from "@/actions";
import Navbar from "@/components/Navbar";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStore(params.storeId);
  if (!store) {
    redirect("/sign-in");
  }

  console.log(store);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
