import CategoryClient from "@/app/(dashboard)/[storeId]/(routes)/categories/_components/CategoryClient";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient />
      </div>
    </div>
  );
};

export default CategoryPage;
