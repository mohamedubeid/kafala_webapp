import { getCountries } from "react-phone-number-input";

export const filteredCountries = () => {
  const countries = getCountries();
  return countries?.filter((country: any) => country !== "IL");
};
