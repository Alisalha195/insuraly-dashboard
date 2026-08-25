import { useTranslation } from "react-i18next";
import { RTL_LANGUAGES } from "../i18n";

const useLangDir = () => {
   
   const {i18n} = useTranslation();
   const currentLanguage = i18n.language || 'en';
   const isRTL = RTL_LANGUAGES.some((lang) => currentLanguage.startsWith(lang));
   const dir = isRTL ? 'rtl' : 'ltr';
   
   return {currentLanguage, isRTL, dir};
}
export default useLangDir;

