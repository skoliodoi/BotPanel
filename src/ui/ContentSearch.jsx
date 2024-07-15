import { useLanguageData } from "../contexts/LanguageContext";
import { MdClear } from "react-icons/md";

function InputField({ inputVal, onChange, onClick, type = "text" }) {
  const { t } = useLanguageData();

  return (
    <div className={"flex items-center gap-1 font-bold text-sky-900"}>
      <input
        className="w-96 rounded-lg border border-sky-900 bg-white py-2.5 pl-4 pr-14 text-sm font-light tracking-wide placeholder-gray-400 transition-all duration-300 placeholder:text-center placeholder:font-bold placeholder:text-sky-900 focus:border-sky-900 focus:outline-none focus:ring focus:ring-sky-900/20 disabled:cursor-not-allowed disabled:opacity-40"
        name="searchFilter"
        type={type}
        value={inputVal}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("keywordSearch")}
      />
      {inputVal && (
        <button
          onClick={onClick}
          className="rounded-lg bg-sky-900 p-3 font-bold text-white transition-all duration-300 hover:border hover:border-sky-900 hover:bg-white hover:text-sky-900"
        >
          <MdClear />
        </button>
      )}
    </div>
  );
}

export default InputField;
