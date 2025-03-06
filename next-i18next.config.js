const path = require("path");

(module.exports = {
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    // fallbackLng: "ar",
    localeDetection: false,
    // localePath: path.resolve("./public/locales"),
  },
  debug: true,
}),
  (err, t) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
  };
