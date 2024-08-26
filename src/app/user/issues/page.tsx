"use client";

import { CreateUser } from "./components/createUser/createUser";
import { Issues } from "./components";
import { useSessionUser } from "./queries";
import { getClientDataFromSearchParam } from "./utils";

import { useIsFirstRender } from "@/hooks/isFirstRender";

import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";
import { MESSAGE } from "@/constants/message";

export default function CreateIssue() {
  const searchParams = useSearchParams();
  const clientDataParam = searchParams.get("clientData");
  const router = useRouter();

  const clientData = getClientDataFromSearchParam({
    clientDataParam: clientDataParam,
  });

  // const { data: user } = useSessionUser();
  const session = useSession();
  console.log(session);

  if (session?.status === "loading") {
    return <Loader />;
  }

  if (session?.data?.user?.type === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    router.push("/");
    return <FullSpanLoader />;
  }

  // Redirect to home page if clientData is not available
  if (!clientDataParam || !clientData) {
    return (window.location.href = "/");
  }

  // If userId is available, show user's issues for the client
  // return <Issues clientId={clientData.id} user={user} />;
  return <div>issues</div>;
}
