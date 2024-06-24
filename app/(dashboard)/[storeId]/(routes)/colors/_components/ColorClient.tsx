"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColorsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import { useEffect, useState } from "react";
import { getColors } from "@/lib/actions";
import { format } from "date-fns";

const ColorClient = () => {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState<ColorsColumn[]>([]);
  useEffect(() => {
    const fetchColors = async () => {
      const colors = await getColors(params.storeId.toString());
      if (!colors) return;
      const formattedColors: ColorsColumn[] = colors?.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          value: item.value,
          createdAt: format(item.createdAt, "MMMM do, yyyy"),
        };
      });
      setData(formattedColors);
    };
    fetchColors();
  }, [params.storeId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="APIs for Colors" />
      <ApiList entityName="colors" entityIdName={"colorId"} />
    </>
  );
};

export default ColorClient;
