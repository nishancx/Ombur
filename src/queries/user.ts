import { getUserServerAction } from "@/app/user/components/userNav/serverActions";
import { LOCAL_STORAGE } from "@/constants/localStorage";
import { QUERY } from "@/constants/query";
import { getItemFromLocalStorage } from "@/libs/client/localStorage";

import { useQuery } from "@tanstack/react-query";

const useSessionUser = () => {
  const savedUserId = getItemFromLocalStorage<string>({
    key: LOCAL_STORAGE.OMBUR_USER_ID,
  });

  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_SESSION_USER,
    queryFn: () =>
      savedUserId ? getUserServerAction({ userId: savedUserId! }) : null,
  });
};

export { useSessionUser };
