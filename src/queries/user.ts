import { getUserServerAction } from "@/app/user/components/userNav/serverActions";
import { LOCAL_STORAGE } from "@/constants/localStorage";
import { getItemFromLocalStorage } from "@/libs/client/localStorage";

import { useQuery } from "@tanstack/react-query";

const useUser = (params?: { enabled: boolean }) => {
  const { enabled = true } = params || {};

  const savedUserId = getItemFromLocalStorage<string>({
    key: LOCAL_STORAGE.OMBUR_USER_ID,
  });

  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () =>
      savedUserId ? await getUserServerAction({ userId: savedUserId! }) : null,
    enabled: enabled,
  });
};

export { useUser };
