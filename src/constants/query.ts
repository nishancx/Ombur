const QUERY_KEYS = {
  GET_SESSION_CLIENT: ["getSessionClient"],
  GET_SESSION_USER: ["getSessionUser"],
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
  GET_CLIENT_ISSUES: ["getClientIssues"],
  GET_CLIENT_CHAT: ({ issueId }: { issueId: string }) => [
    "fetchClientChat",
    { issueId },
  ],
  GET_USER_CHAT: ({ issueId }: { issueId: string }) => [
    "fetchUserChat",
    { issueId },
  ],
};

export const QUERY = {
  QUERY_KEYS,
};
