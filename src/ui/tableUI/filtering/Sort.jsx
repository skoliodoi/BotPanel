import { Tooltip } from "react-tooltip";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { useState } from "react";
import { useDataTable } from "../../../contexts/DataTableContext";
import { useLanguageData } from "../../../contexts/LanguageContext";
function Sort({ type }) {
  const [sort, setSort] = useState(null);
  const { dispatch } = useDataTable();
  const { t } = useLanguageData();
  function sortingHandler(val) {
    setSort(val);
    dispatch({
      type: "sortingSet",
      payload: {
        type,
        sorting: val,
      },
    });
  }
  return (
    <>
      <Tooltip id="sort-tooltip" />
      {!sort && (
        <FaSort
          size={16}
          data-tooltip-id="sort-tooltip"
          data-tooltip-content={t("noSort")}
          data-tooltip-place="top"
          data-tooltip-variant="info"
          data-tooltip-position-strategy="fixed"
          className="cursor-pointer"
          onClick={() => {
            sortingHandler("asc");
          }}
        />
      )}
      {sort === "asc" && (
        <FaSortUp
          size={16}
          data-tooltip-id="sort-tooltip"
          data-tooltip-content={t("sortAsc")}
          data-tooltip-place="top"
          data-tooltip-variant="info"
          data-tooltip-position-strategy="fixed"
          className="cursor-pointer"
          onClick={() => {
            sortingHandler("desc");
          }}
        />
      )}
      {sort === "desc" && (
        <FaSortDown
          size={16}
          data-tooltip-id="sort-tooltip"
          data-tooltip-content={t("sortDesc")}
          data-tooltip-place="top"
          data-tooltip-variant="info"
          data-tooltip-position-strategy="fixed"
          className="cursor-pointer"
          onClick={() => {
            sortingHandler(null);
          }}
        />
      )}
    </>
  );
}

export default Sort;
