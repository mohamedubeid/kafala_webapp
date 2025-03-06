export interface Schema {
  token: string;
  lang: string;
}

export const saveToStorage = <T extends keyof Schema>(
  key: T,
  value: Schema[T]
): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
export const getFromStorage = <T extends keyof Schema>(
  key: T
): Schema[T] | null => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key) as Schema[T]);
  }
  return null;
};
export const removeFromStorage = <T extends keyof Schema>(key: T): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};
