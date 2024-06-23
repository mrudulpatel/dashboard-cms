import { getBillboards } from "@/lib/actions";
import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/billboards/_components/BillboardClient";
import { BillboardColumn } from "./_components/columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await getBillboards(params.storeId);

  const formattedBillboards = billboards?.map((item) => {
    const convertTimestampToDate = (timestamp: any) => {
      return new Date(timestamp.seconds * 1000);
    };
  
    const dateObject = convertTimestampToDate(item.createdAt);
    console.log(dateObject);
    const isValidDate = Date.parse(dateObject.toString());
    return {
      id: item.id,
      label: item.label,
      createdAt: isValidDate ? format(dateObject, "MMMM do, yyyy") : "-",
    };
  }) as BillboardColumn[];

  if (!formattedBillboards) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={[]} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
