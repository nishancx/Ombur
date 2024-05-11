type User = {
  _id: string;
  name: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { User };
