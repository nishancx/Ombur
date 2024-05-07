type Valtio_UserId = {
  userId: string | undefined | null;
  setUserId: ({ userId }: { userId: string | undefined | null }) => void;
};

export type { Valtio_UserId };
