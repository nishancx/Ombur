import { jsonParse } from "@/utils";

const getItemFromLocalStorage = <T>({
  key,
}: {
  key: string;
}): T | undefined => {
  try {
    if (!localStorage) return undefined;

    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return jsonParse(serializedState) as T;
  } catch (error) {
    return undefined;
  }
};

const saveItemToLocalStorage = <T>({
  key,
  value,
}: {
  key: string;
  value: T;
}): boolean => {
  try {
    if (!localStorage) return false;

    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
    return true;
  } catch (error) {
    return false;
  }
};

const removeItemFromLocalStorage = ({ key }: { key: string }): undefined => {
  try {
    if (!localStorage) return undefined;

    localStorage.removeItem(key);
  } catch (error) {
    return undefined;
  }
};

const clearLocalStorage = async () => {
  try {
    if (!localStorage) return undefined;

    localStorage.clear();
  } catch (err) {
    return undefined;
  }
};

export {
  getItemFromLocalStorage,
  saveItemToLocalStorage,
  removeItemFromLocalStorage,
  clearLocalStorage,
};
