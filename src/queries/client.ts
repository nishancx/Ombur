import { getClientProfileInfoServerAction } from "@/app/user/issues/components/leftPane/serverActions";
import { QUERY } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

const useClientProfileInfo = ({
  enabled = true,
  clientId,
}: {
  enabled?: boolean;
  clientId: string;
}) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_PROFILE_INFO({ clientId }),
    queryFn: async () => await getClientProfileInfoServerAction({ clientId }),
    enabled,
  });
};

export { useClientProfileInfo };
