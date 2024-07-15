import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useDataTable } from "../../contexts/DataTableContext";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Filter from "./filtering/Filter";
import Sort from "./filtering/Sort";
import { useLanguageData } from "../../contexts/LanguageContext";

function TableHeader({ title, type, filter }) {
  const [filterClassName, setFilterClassName] = useState("filter-icon-initial");
  const [showFilter, setShowFilter] = useState(false);

  const { dispatch } = useDataTable();
  const { t } = useLanguageData();
  function onHoverHandler(val) {
    if (filter) setFilterClassName(val);
  }

  function clearFilterHandler() {
    dispatch({ type: `${type}FilterCleared` });
    setShowFilter(false);
  }
  if (showFilter)
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 text-sky-900 hover:bg-sky-100">
        {
          <div className="w-full flex-1">
            <Filter type={type} />
          </div>
        }
        <div className="mr-2 flex gap-3">
          <Tooltip id="filter-off"></Tooltip>
          <MdFilterAltOff
            size={16}
            data-tooltip-id="filter-off"
            data-tooltip-content={t("filterOff")}
            data-tooltip-place="top"
            data-tooltip-variant="info"
            data-tooltip-position-strategy="fixed"
            className="cursor-pointer"
            onClick={clearFilterHandler}
          />
          {type !== "status" && <Sort type={type} />}
        </div>
      </div>
    );
  if (!showFilter)
    return (
      <div
        onMouseEnter={() => onHoverHandler("filter-icon-enter")}
        onMouseLeave={() =>
          onHoverHandler("filter-icon-exit filter-icon-initial")
        }
        className="filter-parent flex h-full w-full content-center p-0 text-center leading-tight text-sky-900 hover:bg-sky-100"
      >
        <div className="filter-box group flex w-full items-center justify-center gap-1 ">
          <div className="flex w-full items-center">
            <div className="ml-6 flex-1">
              <span>{title}</span>
            </div>
            <div className="mr-2 flex items-center gap-3">
              <Tooltip id="filter-tooltip" />
              <MdFilterAlt
                size={16}
                data-tooltip-id="filter-tooltip"
                data-tooltip-content={t("filterOn")}
                data-tooltip-place="top"
                data-tooltip-variant="info"
                data-tooltip-position-strategy="fixed"
                className={`${filterClassName} cursor-pointer`}
                onClick={() => {
                  setShowFilter(true);
                }}
              />
              {type !== "status" && <Sort type={type} />}
            </div>
          </div>
        </div>
      </div>
    );
}

export default TableHeader;
