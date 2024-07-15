import Datepicker from "react-tailwindcss-datepicker";
import { useDataTable } from "../../contexts/DataTableContext";
import { useLanguageData } from "../../contexts/LanguageContext";

function DatePicker() {
  const {
    dispatch,
    tableData: { timePeriod: date },
  } = useDataTable();
  const {
    t,
    chosenLanguage: { code },
  } = useLanguageData();
  const shortcutSettings = {
    today: t("today"),
    yesterday: t("yesterday"),
    past: (period) => t("past", { period }),
    currentMonth: t("currentMonth"),
    pastMonth: t("pastMonth"),
  };

  function changeDateHandler(value) {
    dispatch({ type: "datesSelected", payload: value });
  }
  // const darkMode =
  //   "dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 ";
  return (
    <div className="flex items-center gap-32">
      <Datepicker
        // separator={"-"}
        placeholder={t("dateSearch")}
        startWeekOn={"mon"}
        i18n={code}
        showShortcuts={true}
        configs={{ shortcuts: shortcutSettings }}
        value={date}
        onChange={changeDateHandler}
        inputClassName="transition-all placeholder:text-sky-900 placeholder:font-bold placeholder:text-center w-full duration-300 py-2.5 pl-4 pr-14 w-full border border-sky-900 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed focus:border-sky-900 ring-white focus:outline-none"
      />
    </div>
  );
}

export default DatePicker;
