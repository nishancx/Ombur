import clsx from "clsx";
import styles from "./button.module.css";

type ButtonProps = {
  onClick?: () => void;
  hasBackground?: boolean;
  hasBorderRadius?: boolean;
} & (
  | { text: string; children?: never }
  | { children: React.ReactNode; text?: never }
);

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  hasBackground = true,
  hasBorderRadius = true,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        hasBackground && styles.buttonWithBackground,
        hasBorderRadius && styles.buttonWithBorderRadius
      )}
    >
      {children || text}
    </button>
  );
};

export { Button };
