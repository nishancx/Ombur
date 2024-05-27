const QUERY_KEYS = {
  GET_USER: ["getUser"],
  GET_CLIENT_PROFILE_INFO: ({ clientId }: { clientId: string }) => [
    "getClientProfileInfo",
    { clientId },
  ],
  GET_USER_ISSUES: ({
    clientId,
    userId,
  }: {
    clientId: string;
    userId: string;
  }) => [
    "getUserIssues",
    {
      clientId,
      userId,
    },
  ],
};

export const QUERY = {
  QUERY_KEYS,
};
