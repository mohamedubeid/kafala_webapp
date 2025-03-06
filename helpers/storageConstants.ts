import { Schema } from "./storageHelper";

const StorageConstants = {
  TOKEN: "token" as keyof Schema,
  LOCALE: "lang " as keyof Schema,
};

export default StorageConstants;
