interface Store {
  _id: string;
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
  storeId: string;
}

interface BillboardFormValues {
  label: string;
}

type Category = {
  _id: string;
  storeId: string;
  name: string;
  billboardId: string;
  createdAt: string;
  updatedAt: string;
};

interface AddCategoryData {
  name: string;
  storeId: string;
  billboardId: string;
}

interface AddSizeData {
  name: string;
  value: string;
  storeId: string;
}

type Size = {
  _id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}