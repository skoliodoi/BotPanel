import i18next from "i18next";

const initialLanguageState = {
  chosenLanguage: {
    code: "pl",
    display: "Polski",
  },
  languages: [
    {
      code: "pl",
      display: "Polski",
    },
    {
      code: "en",
      display: "English",
    },
    {
      code: "de",
      display: "Deutsch",
    },
    {
      code: "zh",
      display: "中文",
    },
  ],
};

function languageReducer(state, action) {
  switch (action.type) {
    case "languageSelected": {
      const selectedLanguage = state.languages.find(
        (el) => el.code == action.payload,
      );
      console.log(selectedLanguage);
      i18next.changeLanguage(action.payload);
      return { ...state, chosenLanguage: selectedLanguage };
    }
    default:
      throw new Error("Action unrecognized!");
  }
}

export { initialLanguageState, languageReducer };
