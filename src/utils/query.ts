import _ from "lodash";
import { GlobalPageParams } from "@/types/query";

const reduceInfiniteData = <T extends { _id: string }>(
  data?: GlobalPageParams<T>[]
) => {
  if (!data || !_.isArray(data)) return [];

  return data
    ?.flatMap((page) => page?.data)
    .reduce((uniqueItems: T[], currentItem: T) => {
      // Check if the item with the same ID already exists in the uniqueItems array
      const existingItem = uniqueItems?.find(
        (item) => currentItem?._id === item?._id
      );

      // If the item doesn't exist, add it to the uniqueItems array
      if (!existingItem) {
        uniqueItems?.push(currentItem);
      }

      return uniqueItems;
    }, []);
};

export { reduceInfiniteData };
