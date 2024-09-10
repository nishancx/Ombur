import { ClientPageContent } from "./components";

import { auth } from "@/../auth";
import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";
import { MESSAGE } from "@/constants/message";
import { redirect } from "next/navigation";

export default async function Client() {
  return <div>this is client page</div>;
  // const session = await auth();

  // if (session?.user?.type === MESSAGE.SENDER_TYPE_INDEX.USER) {
  //   redirect("/");
  //   return <FullSpanLoader />;
  // }

  // if (!session) {
  //   return null;
  // }

  // return <ClientPageContent />;
}
