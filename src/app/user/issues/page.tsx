"use client";

import { CreateUser } from "./components/createUser/createUser";
import { Issues } from "./components/issues/issues";
import { getClientDataFromSearchParam } from "./utils";

import { useIsFirstRender } from "@/hooks/isFirstRender";
import { useSessionUser } from "@/queries/user";

import { useSearchParams } from "next/navigation";

export default function CreateIssue() {
  const searchParams = useSearchParams();
  const clientDataParam = searchParams.get("clientData");

  const clientData = getClientDataFromSearchParam({
    clientDataParam: clientDataParam,
  });

  const { data: user } = useSessionUser();
  const isFirstRender = useIsFirstRender();

  // Redirect to home page if clientData is not available
  if (!clientDataParam || !clientData) {
    return (window.location.href = "/");
  }

  // Return null if it's the first render or userId is undefined (loading userId from local storage)
  // to avoid hydration error
  if (isFirstRender || user === undefined) {
    return null;
  }

  // If userId is not available, show create user form
  if (user === null) {
    return <CreateUser />;
  }

  // If userId is available, show user's issues for the client
  return <Issues clientId={clientData.id} user={user} />;
}
