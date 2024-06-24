import {  getCategory } from "@/lib/actions";
import CategoriesForm from "./_components/CategoriesForm";

const BillboardPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const categories = await getCategory(params.categoryId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesForm initialData={categories} />
      </div>
    </div>
  );
};

export default BillboardPage;
