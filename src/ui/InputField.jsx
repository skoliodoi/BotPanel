import { useEffect, useState } from "react";
import { useLanguageData } from "../contexts/LanguageContext";

function InputField({ label, inputVal, onChange, type = "text" }) {
  const { t } = useLanguageData();
  const [displayLabel, setDisplayLabel] = useState(label);

  useEffect(() => {
    setDisplayLabel(t(label));
  }, [t, label]);
  const isLoginField =
    label.toLowerCase() === "login" || label.toLowerCase() === "pass";
  let loginStyle = "";
  if (label.toLowerCase() === "login") {
    loginStyle = `text-xl font-bold text-primebot-blue`;
  }

  if (label.toLowerCase() === "pass") {
    loginStyle = `text-xl font-bold text-primebot-grey`;
  }

  return (
    <div className={`flex flex-col ${isLoginField ? "" : "w-1/4"}`}>
      <label
        htmlFor="searchFilter"
        className={`${isLoginField ? loginStyle : ""}`}
      >
        {displayLabel}
      </label>
      <input
        className="relative w-full rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-14 text-sm font-light tracking-wide placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        name="searchFilter"
        type={type}
        value={inputVal}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputField;
