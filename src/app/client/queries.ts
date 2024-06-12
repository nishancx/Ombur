import {
  getClientIssuesServerAction,
  getSessionClientServerAction,
} from "./serverActions";

import { QUERY } from "@/constants/query";

import { useQuery } from "@tanstack/react-query";

const useClientIssues = () => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_CLIENT_ISSUES,
    queryFn: () => getClientIssuesServerAction(),
  });
};

const useSessionClient = () => {
  return useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_SESSION_CLIENT,
    queryFn: () => getSessionClientServerAction(),
  });
};

export { useClientIssues, useSessionClient };
