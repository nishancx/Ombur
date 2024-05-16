"use client";

import styles from "./clientProfile.module.css";
import { getClientProfileInfoServerAction } from "../leftPane/serverActions";

import { FILE_PATHS } from "@/constants/filePaths";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

type ClientProfileProps = {
  clientId: string;
};

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const { data: clientProfileInfo, isLoading } = useQuery({
    queryKey: ["getClientProfileInfo", clientId],
    queryFn: async () => await getClientProfileInfoServerAction({ clientId }),
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
        src={clientProfileInfo.avatar || FILE_PATHS.DEFAULT_USER_IMAGE}
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
