import "server-only";

export enum Locale {
  FR = "fr",
  EN = "en",
}

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  await dictionaries[locale]();
