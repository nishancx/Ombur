import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ClientPageContent } from "./components";
import { cookies as getCookies } from "next/dist/client/components/headers";

export default async function Client() {
  const cookies = getCookies();
  const authToken = getToken({ cookies });

  return <ClientPageContent authToken={authToken} />;
}

const getToken = ({ cookies }: { cookies: ReadonlyRequestCookies }) => {
  let name = "";
  let value = "";
  const httpsToken = cookies.get("__Secure-authjs.session-token");

  if (!!httpsToken) {
    name = "__Secure-authjs.session-token";
    value = httpsToken.value || "";
  }

  const httpToken = cookies.get("authjs.session-token");
  if (!!httpToken) {
    name = "authjs.session-token";
    value = httpToken.value;
  }

  return btoa(JSON.stringify({ name, value }));
};
