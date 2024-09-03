import clsx from "clsx";
import styles from "./empty.module.css";

import Image from "next/image";

type EmptyProps = {
  imageSize?: number;
  description?: string;
  descriptionClassName?: string;
  containerClassName?: string;
};
const Empty: React.FC<EmptyProps> = ({
  imageSize = 100,
  description,
  descriptionClassName,
  containerClassName,
}) => {
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <Image
        src="/empty.png"
        alt="Empty"
        width={imageSize}
        height={imageSize}
      />
      {!!description && (
        <div className={clsx(styles.description, descriptionClassName)}>
          {description}
        </div>
      )}
    </div>
  );
};

export { Empty };
