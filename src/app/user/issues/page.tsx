"use client";

import { userIdStore } from "@/libs/client";
import { CreateUser, Issues } from "./components";
import { useSnapshot } from "valtio";
import { useIsFirstRender } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { getClientDataFromSearchParam } from "./utils";

export default function CreateIssue() {
  const searchParams = useSearchParams();
  const clientDataParam = searchParams.get("clientData");

  const clientData = getClientDataFromSearchParam({
    clientDataParam: clientDataParam,
  });

  const { userId } = useSnapshot(userIdStore);
  const isFirstRender = useIsFirstRender();

  // Redirect to home page if clientData is not available
  if (!clientDataParam || !clientData) {
    return (window.location.href = "/");
  }

  // Return null if it's the first render or userId is null (loading userId from local storage)
  if (isFirstRender || userId === null) {
    return null;
  }

  // If userId is not available, show create user form
  if (!userId) {
    return <CreateUser />;
  }

  // If userId is available, show user's issues for the client
  return <Issues clientId={clientData.id} />;
}