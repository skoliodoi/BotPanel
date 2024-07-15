import { useDataTable } from "../contexts/DataTableContext";
import { useLanguageData } from "../contexts/LanguageContext";
import Button from "./Button";
import ContentSearch from "./ContentSearch";
import DatePicker from "./tableUI/DatePicker";

function FunctionalitySegment() {
  const {
    exportToCSV,
    tableData: {
      filters: { content },
    },
    dispatch,
  } = useDataTable();
  const { t } = useLanguageData();
  function searchFilterHandler(e) {
    dispatch({ type: "contentFilterSet", payload: e });
  }

  return (
    <>
      <div className="flex h-auto w-full items-center justify-between gap-4 bg-sky-100 p-4">
        <div className="flex w-auto items-center gap-8">
          <DatePicker />
          <ContentSearch
            inputVal={content}
            onChange={(e) => searchFilterHandler(e)}
            onClick={() => {
              dispatch({ type: "contentFilterCleared" });
            }}
          />
        </div>
        <Button onClick={exportToCSV}>{t("csvExport")}</Button>
      </div>
    </>
  );
}

export default FunctionalitySegment;
