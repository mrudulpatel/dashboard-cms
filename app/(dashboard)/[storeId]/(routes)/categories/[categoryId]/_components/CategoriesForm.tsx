"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { BillboardType, Category } from "@/index";
import { addCategory, deleteCategory, getBillboards, updateCategory } from "@/lib/actions";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AlertModal from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

interface CategoriesFormProps {
  initialData: Category | null | undefined;
}


export type CategoryFormValues = z.infer<typeof formSchema>;

const CategoriesForm: React.FC<CategoriesFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  console.log(initialData);
  const [billboards, setBillboards] = useState<BillboardType[] | null | undefined>();

  useEffect(() => {
    const fetchBillboards = async () => {
      const data = await getBillboards(params.storeId.toString());
      setBillboards(data); // This will set the state to whatever getBillboards returns, handling null or undefined automatically
    };

    fetchBillboards();
  }, [params.storeId]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Category" : "Add Category";
  const description = initialData ? "Edit a category" : "Add new category";
  const toastMessage = initialData ? "Category updated!" : "Category added!";
  const action = initialData ? "Save Changes" : "Create Category";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateCategory(initialData._id.toString(), data);
      } else {
        await addCategory({ ...data, storeId: params.storeId });
      }
      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (!initialData) return;
      await deleteCategory(initialData?._id.toString());
      router.refresh();
      router.push("/");
      toast.success(toastMessage);
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"billboardId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder=""
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((item) => (
                        <SelectItem
                          key={item._id.toString()}
                          value={item._id.toString()}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default CategoriesForm;
