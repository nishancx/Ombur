"use client";

import styles from "./dropdown.module.css";

import { useOutsideClickHandler } from "@/hooks/outsideClickHandler";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

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
      {dropdownEnabled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}

      {dropdownEnabled ? <div className={styles.content}>{content}</div> : null}
    </div>
  );
};

export { Dropdown };
