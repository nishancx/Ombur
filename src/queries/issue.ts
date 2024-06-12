import { getClientIssuesServerAction } from "@/app/client/components/leftPane/serverActions";
import { getUsersIssuesServerAction } from "@/app/user/issues/components/leftPane/serverActions";
import { QUERY } from "@/constants/query";

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

const useClientIssues = () => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_ISSUES,
    queryFn: () => getClientIssuesServerAction(),
  });
};

export { useUserIssues, useClientIssues };
