"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SizesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import { useEffect, useState } from "react";
import { getSizes } from "@/lib/actions";
import { format } from "date-fns";

const SizesClient = () => {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState<SizesColumn[]>([]);
  useEffect(() => {
    const fetchSizes = async () => {
      const sizes = await getSizes(params.storeId.toString());
      if(!sizes) return;
      const formattedSizes: SizesColumn[] = sizes?.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          value: item.value,
          createdAt: format(item.createdAt, "MMMM do, yyyy"),
        };
      });
      setData(formattedSizes);
    };
    fetchSizes();
  }, [params.storeId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data?.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="APIs for Sizes" />
      <ApiList entityName="sizes" entityIdName={"sizeId"} />
    </>
  );
};

export default SizesClient;
