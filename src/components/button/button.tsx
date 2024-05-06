import styles from "./button.module.css";

type ButtonProps = {
  onClick?: () => void;
  showBorder?: boolean;
} & (
  | { text: string; children?: never }
  | { children: React.ReactNode; text?: never }
);

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  showBorder = true,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={
        showBorder
          ? { border: "1px solid #05608d", borderRadius: "5px" }
          : { border: "1px solid transparent" }
      }
    >
      {children || text}
    </button>
  );
};

export { Button };
