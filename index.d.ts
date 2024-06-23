import { ObjectId } from "mongodb";

interface Store {
  _id: ObjectId;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Billboard {
  id: string;
  label: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}
