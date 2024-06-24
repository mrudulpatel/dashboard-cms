import { getSize } from "@/lib/actions";
import SizesForm from "./_components/SizesForm";

const BillboardPage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const sizeData = await getSize(params.sizeId);
  console.log(sizeData);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesForm initialData={sizeData} />
      </div>
    </div>
  );
};

export default BillboardPage;
