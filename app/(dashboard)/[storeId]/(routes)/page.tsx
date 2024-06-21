import { getStore } from "@/actions";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await getStore(params.storeId);
  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
