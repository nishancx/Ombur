import { getUsersIssuesServerAction } from "./serverActions";

import { QUERY } from "@/constants/query";
import { getClientProfileInfoServerAction } from "@/app/user/issues/serverActions";
import { getUserServerAction } from "@/app/user/issues/serverActions";
import { LOCAL_STORAGE } from "@/constants/localStorage";
import { getItemFromLocalStorage } from "@/libs/client/localStorage";

import { useQuery } from "@tanstack/react-query";

const useUserIssues = ({
  clientId,
  userId,
}: {
  clientId: string;
  userId: string;
}) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_USER_ISSUES({ clientId, userId }),
    queryFn: () => getUsersIssuesServerAction({ clientId, userId }),
  });
};

const useClientProfileInfo = ({ clientId }: { clientId: string }) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_PROFILE_INFO({ clientId }),
    queryFn: async () => await getClientProfileInfoServerAction({ clientId }),
  });
};

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

export { useUserIssues, useClientProfileInfo, useSessionUser };
