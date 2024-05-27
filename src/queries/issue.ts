import { getIssuesServerAction } from "@/app/user/issues/components/leftPane/serverActions";
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
    queryFn: () => getIssuesServerAction({ clientId, userId }),
  });
};

export { useUserIssues };
