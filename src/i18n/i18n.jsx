import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_common from "./en/common.json";
import vi_common from "./vi/common.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {...en_common}
      },
      vi: {
        translation: {...vi_common}
      }
    },
    lng: "vi", 
    fallbackLng: "vi",

    interpolation: {
      escapeValue: false 
    }
  });