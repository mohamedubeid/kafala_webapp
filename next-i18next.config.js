const path = require("path");

(module.exports = {
  i18n: {
    locales: ["ar", "en"],
    fallbackLng: "ar",
    defaultLocale: "ar",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
  debug: true,
}),
  (err, t) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
  };
