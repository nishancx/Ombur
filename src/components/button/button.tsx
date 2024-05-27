import styles from "./button.module.css";

import clsx from "clsx";

type ButtonProps = {
  onClick?: () => void;
  hasBackground?: boolean;
  hasBorderRadius?: boolean;
  className?: string;
  disabled?: boolean;
} & (
  | { text: string; children?: never }
  | { children: React.ReactNode; text?: never }
);

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  hasBackground = true,
  hasBorderRadius = true,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        hasBackground && styles.buttonWithBackground,
        hasBorderRadius && styles.buttonWithBorderRadius,
        disabled && styles.disabled,
        className
      )}
      disabled={disabled}
    >
      {children || text}
    </button>
  );
};

export { Button };
