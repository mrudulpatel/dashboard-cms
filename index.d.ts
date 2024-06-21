interface Store {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Billboard {
  id: string;
  label: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}
