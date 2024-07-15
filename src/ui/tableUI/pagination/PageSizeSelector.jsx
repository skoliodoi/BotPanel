import { useEffect, useState } from "react";
import { useDataTable } from "../../../contexts/DataTableContext";
import PageButton from "./PageButton";
import { useLanguageData } from "../../../contexts/LanguageContext";

function PageSizeSelector() {
  const {
    dispatch,
    tableData: { pageSize, totalCount, selectedPage },
  } = useDataTable();
  const { t } = useLanguageData();
  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(selectedPage * pageSize);
  function pageSizeHandler(e) {
    dispatch({ type: "pageSizeSelected", payload: e.target.value });
  }

  useEffect(() => {
    setFirstNumber(() => {
      if (selectedPage == 1) return 1;
      return (selectedPage - 1) * pageSize + 1;
    });
    setSecondNumber(() => {
      if (selectedPage == 1) return selectedPage * pageSize;
      if (selectedPage * pageSize > totalCount) return totalCount;
      return selectedPage * pageSize;
    });
  }, [selectedPage, pageSize, totalCount]);
  return (
    <div className="flex items-center gap-3 font-bold text-sky-900">
      <p>
        {firstNumber}-{secondNumber}
      </p>
      <select
        className="custom-select justify-center rounded-md border border-sky-900 p-3 text-center font-sans"
        value={pageSize}
        onChange={(e) => pageSizeHandler(e)}
      >
        <option className="font-normal" value="20">
          20
        </option>
        <option className="font-normal" value="50">
          50
        </option>
        <option className="font-normal" value="100">
          100
        </option>
      </select>

      <p>
        <span className="mr-2">{t("totalRecordCount")}</span>
        <PageButton selected={true} disabled={true}>
          {totalCount.toLocaleString()}
        </PageButton>
      </p>
    </div>
  );
}

export default PageSizeSelector;
