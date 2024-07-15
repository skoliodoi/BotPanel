import { createContext, useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";
import {
  initialLanguageState,
  languageReducer,
} from "../reducers/languageReducer";

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [{ chosenLanguage, languages }, dispatch] = useReducer(
    languageReducer,
    initialLanguageState,
  );

  const { t } = useTranslation();

  return (
    <LanguageContext.Provider
      value={{ t, chosenLanguage, languages, dispatch }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguageData() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("LanguageContext was used outside of LanguageProvider");
  }
  return context;
}
export { LanguageProvider, useLanguageData };
