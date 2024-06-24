import SizesClient from "./_components/SizesClient";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient />
      </div>
    </div>
  );
};

export default SizesPage;
