import { useDataTable } from "../../../contexts/DataTableContext";
import { useLanguageData } from "../../../contexts/LanguageContext";

function Filter({ type }) {
  const {
    tableData: { filters },
    dispatch,
  } = useDataTable();

  const filterValue = filters[type];
  const isDate = type === "startDate" || type === "endDate";
  const { t } = useLanguageData();
  function filterHandler(e) {
    if (type !== "status") {
      let inputValue =
        type === "phone"
          ? e.target.value.replace(/[^0-9-+]/g, "")
          : e.target.value.replace(/[^0-9]/g, "");
      if (type !== "phone") {
        if (inputValue.length > 4) {
          inputValue =
            inputValue.slice(0, 4) +
            "-" +
            inputValue.slice(4).replace(/-/g, "");
        }

        if (inputValue.length > 5 && inputValue.length <= 7) {
          const monthPart = inputValue.slice(5, 7);
          if (
            (monthPart.length === 1 && parseInt(monthPart, 10) > 1) ||
            (monthPart.length === 2 && parseInt(monthPart, 10) > 12)
          ) {
            return;
          }
        }
        if (inputValue.length > 7) {
          inputValue =
            inputValue.slice(0, 7) +
            "-" +
            inputValue.slice(7).replace(/-/g, "");
        }

        if (inputValue.length > 8 && inputValue.length <= 10) {
          const dayPart = inputValue.slice(8, 10);
          if (
            (dayPart.length === 1 && parseInt(dayPart, 10) > 3) ||
            (dayPart.length === 2 && parseInt(dayPart, 10) > 31)
          ) {
            return;
          }
        }

        if (inputValue.length > 10) return;
      }
      e.target.value = inputValue;
    }
    dispatch({ type: `${type}FilterSet`, payload: e.target.value });
  }
  return (
    <div className="ml-3 h-auto w-auto border-sky-800 ">
      <input
        className="h-8 w-full content-center rounded-md border border-sky-900 text-center  placeholder:text-center  focus:outline-none focus:ring-0"
        placeholder={`${isDate ? "YYYY-MM-DD" : t("filterOn")}`}
        type="text"
        value={filterValue}
        onChange={filterHandler}
      />
    </div>
  );
}

export default Filter;
