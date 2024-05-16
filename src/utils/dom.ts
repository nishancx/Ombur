import { KeyboardEvent } from "react";

const invokeOnEnterPress = ({
  event,
  action,
}: {
  event: KeyboardEvent;
  action: () => void;
}) => {
  if (event.key === "Enter") {
    action();
  }
};

export { invokeOnEnterPress };
