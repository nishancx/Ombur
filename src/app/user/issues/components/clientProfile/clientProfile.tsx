"use client";

import styles from "./clientProfile.module.css";

import { FILE_PATHS } from "@/constants/filePaths";
import { useClientProfileInfo } from "@/queries/client";

import Image from "next/image";
import { Loader } from "lucide-react";

type ClientProfileProps = {
  clientId: string;
};

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const { data: clientProfileInfo, isLoading } = useClientProfileInfo({
    clientId,
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
