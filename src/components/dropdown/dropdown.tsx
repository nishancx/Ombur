"use client";

import { useOutsideClickHandler } from "@/hooks";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./dropdown.module.css";

type DropdownProps = {
  handle: React.ReactNode;
  content: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ handle, content }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownEnabled, setIsDropdownEnabled] = useState(false);
  useOutsideClickHandler(dropdownRef, () => setIsDropdownEnabled(false));

  return (
    <div
      className={styles.container}
      ref={dropdownRef}
      onClick={() =>
        setIsDropdownEnabled((dropdownEnabled) => !dropdownEnabled)
      }
    >
      {handle}
      <ChevronDown size={18} />

      {dropdownEnabled ? <div className={styles.content}>{content}</div> : null}
    </div>
  );
};

export { Dropdown };
