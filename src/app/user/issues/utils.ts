import { ClientDataSearchParam } from "@/types/searchParams";
import { jsonParse } from "@/utils/object";

const getClientDataFromSearchParam = ({
  clientDataParam,
}: {
  clientDataParam: string | null;
}): null | ClientDataSearchParam => {
  try {
    if (!clientDataParam) return null;

    const clientData: ClientDataSearchParam = jsonParse(
      decodeURIComponent(atob(clientDataParam || ""))
    );

    return clientData;
  } catch (e) {
    return null;
  }
};

export { getClientDataFromSearchParam };
