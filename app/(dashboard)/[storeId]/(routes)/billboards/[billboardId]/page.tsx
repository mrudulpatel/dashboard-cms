import { getBillboard } from "@/actions";
import BillboardForm from "./_components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboard = await getBillboard(params.storeId, params.billboardId);
  console.log(billboard);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
