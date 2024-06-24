"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { addSize, deleteSize, updateSize } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

interface SizesFormProps {
  initialData: Size | null | undefined;
}

export type SizesFormValues = z.infer<typeof formSchema>;

const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  console.log(initialData);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Size" : "Add Size";
  const description = initialData ? "Edit a Size" : "Add new Size";
  const toastMessage = initialData ? "Size updated!" : "Size added!";
  const action = initialData ? "Save Changes" : "Create Size";

  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateSize(initialData._id, data);
      } else {
        await addSize({ ...data, storeId: params.storeId.toString() });
      }
      router.push(`/${params.storeId}/sizes`);
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
      await deleteSize(initialData?._id);
      router.refresh();
      router.push("/");
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Make sure to delete all products using this size first.");
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
                      placeholder="Size Name"
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
              name={"value"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size Value"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
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

export default SizesForm;
