"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/actions";
import { format } from "date-fns";

const CategoryClient = () => {
  const router = useRouter();
  const params = useParams();

  const [categories, setCategories] = useState<CategoryColumn[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(params?.storeId.toString());
      if (!data) return setCategories([]);
      const formattedCategories: CategoryColumn[] = data?.map((item) => ({
        _id: item._id as string,
        name: item.name,
        billboardLabel: item?.billboardId?.label,
        createdAt: format(new Date(item.createdAt), "MMM dd, yyyy"),
      }));
      console.log(formattedCategories);
      setCategories(formattedCategories);
    };

    fetchCategories();
  }, [params.storeId]);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories?.length})`}
          description="Manage Categories for your Billboard"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title="API" description="APIs for Categories" />
      <ApiList entityName="categories" entityIdName={"categoryId"} />
    </>
  );
};

export default CategoryClient;
