import { getUsersIssuesServerAction } from "./serverActions";

import { QUERY } from "@/constants/query";
import { getClientProfileInfoServerAction } from "@/app/user/issues/serverActions";

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
    refetchOnWindowFocus: "always",
  });
};

const useClientProfileInfo = ({ clientId }: { clientId: string }) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_PROFILE_INFO({ clientId }),
    queryFn: async () => await getClientProfileInfoServerAction({ clientId }),
  });
};

export { useUserIssues, useClientProfileInfo };
