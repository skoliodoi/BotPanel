import { useState } from "react";
import { useLanguageData } from "../contexts/LanguageContext";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { chosenLanguage, languages, dispatch } = useLanguageData();
  function languageSelectionHandler(val) {
    dispatch({ type: "languageSelected", payload: val });
    setIsOpen(false);
  }
  return (
    <div
      className={`relative flex h-10 w-32 flex-col items-center ${isOpen ? "rounded-t-lg border-b-0" : "rounded-lg"} border border-white bg-sky-900`}
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-full  w-full items-center justify-around rounded-t-lg text-white"
      >
        {chosenLanguage.display}
        {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </button>
      {isOpen && (
        <div
          className={`${isOpen ? "border-t-0" : ""} absolute top-9 z-50 w-32 rounded-b-lg border border-white`}
        >
          {languages
            .filter((el) => el.code != chosenLanguage.code)
            .map((item) => (
              <div
                onClick={() => languageSelectionHandler(item.code)}
                className="cursor-pointer bg-sky-900 p-2 text-white last:rounded-b-lg  hover:border-r hover:bg-white hover:font-bold hover:text-sky-900"
                key={item.code}
              >
                <span className="ml-2">{item.display}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
