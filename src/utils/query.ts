import { GlobalPageParams } from "@/types/query";
import { isArray } from "lodash";

const reduceInfiniteData = <T>(data?: GlobalPageParams<T>[]) => {
  if (!data || !isArray(data)) return [];

  return data
    ?.flatMap((page) => page?.data)
    .reduce(
      (uniqueItems: { _id: string; [x: string]: any }[], currentItem: any) => {
        // Check if the item with the same ID already exists in the uniqueItems array
        const existingItem = uniqueItems?.find(
          (item) => currentItem?._id === item?._id
        );

        // If the item doesn't exist, add it to the uniqueItems array
        if (!existingItem) {
          uniqueItems?.push(currentItem);
        }

        return uniqueItems;
      },
      []
    );
};

export { reduceInfiniteData };
