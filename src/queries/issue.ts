import { getIssuesServerAction } from "@/app/user/issues/components/leftPane/serverActions";
import { QUERY } from "@/constants/query";

import { useQuery } from "@tanstack/react-query";

const useUserIssues = ({
  enabled = true,
  clientId,
  userId,
}: {
  enabled?: boolean;
  clientId: string;
  userId: string;
}) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_USER_ISSUES({ clientId, userId }),
    queryFn: async () => await getIssuesServerAction({ clientId, userId }),
    enabled,
  });
};

export { useUserIssues };
