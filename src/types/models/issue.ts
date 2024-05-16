type Issue = {
  _id: string;
  title: string;
  description: string;
  clientId: string;
  userId: string;
  resolved: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Issue };
