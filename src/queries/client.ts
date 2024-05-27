import { getSessionClientServerAction } from "@/app/client/components/clientNav/serverActions";
import { getClientProfileInfoServerAction } from "@/app/user/issues/components/leftPane/serverActions";
import { QUERY } from "@/constants/query";

import { useQuery } from "@tanstack/react-query";

const useClientProfileInfo = ({ clientId }: { clientId: string }) => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_PROFILE_INFO({ clientId }),
    queryFn: async () => await getClientProfileInfoServerAction({ clientId }),
  });
};

const useSessionClient = () => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_SESSION_CLIENT,
    queryFn: () => getSessionClientServerAction(),
  });
};

export { useClientProfileInfo, useSessionClient };
