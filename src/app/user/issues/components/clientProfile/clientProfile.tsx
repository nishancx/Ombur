"use client";

import styles from "./clientProfile.module.css";
import { useClientProfileInfo } from "../../queries";

import { FILE_PATHS } from "@/constants/filePaths";

import clsx from "clsx";
import Image from "next/image";
import { Loading } from "@/components/loading/loading";

type ClientProfileProps = {
  clientId: string;
};

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const { data: clientProfileInfo, isLoading } = useClientProfileInfo({
    clientId,
  });

  if (isLoading) {
    return (
      <div className={clsx(styles.container, styles.loaderContainer)}>
        <Loading />
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
