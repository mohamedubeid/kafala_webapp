export const getFromSessionStorage = (key: string) =>
  sessionStorage.getItem(key);

export const saveToSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};
export const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
