import { type ClassValue } from "clsx";

export function mergeClasses(...inputs: ClassValue[]) {
  return inputs.join(" ");
}
