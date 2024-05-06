"use client";

import { RefObject, useEffect } from "react";

function useOutsideClickHandler(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, handler]);
}

export { useOutsideClickHandler };
