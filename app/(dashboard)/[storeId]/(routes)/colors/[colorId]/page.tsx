import { getColor } from "@/lib/actions";
import ColorForm from "./_components/ColorForm";

const ColorsPage = async ({ params }: { params: { colorId: string } }) => {
  const colorData = await getColor(params.colorId);
  console.log(colorData);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colorData} />
      </div>
    </div>
  );
};

export default ColorsPage;
