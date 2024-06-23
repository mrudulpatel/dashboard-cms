import { ObjectId } from "mongodb";

interface Store {
  _id: ObjectId;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface BillboardType {
  _id: string;
  label: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

interface AddBillboardData {
  label: string;
  storeId: any;
}

interface BillboardFormValues {
  label: string;
}