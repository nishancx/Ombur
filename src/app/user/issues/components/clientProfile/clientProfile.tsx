"use client";

import styles from "./clientProfile.module.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getClientProfileInfo } from "../issuesList/serverActions";
import { Loader } from "lucide-react";

type ClientProfileProps = {
  clientId: string;
};

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const { data: clientProfileInfo, isLoading } = useQuery({
    queryKey: ["clientProfileInfo", { clientId }],
    queryFn: () => getClientProfileInfo({ clientId }),
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (!clientProfileInfo) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Image
        src={clientProfileInfo.avatar || "/person.png"}
        alt="avatar"
        width={50}
        height={50}
        className={styles.clientAvatar}
      />
      <div className={styles.clientName}>{clientProfileInfo.name}</div>
    </div>
  );
};

export { ClientProfile };
