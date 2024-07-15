import { useDataTable } from "../../../contexts/DataTableContext";
import { useLanguageData } from "../../../contexts/LanguageContext";
import calculateButtonNumbers from "../../../helpers/calculateButtonNumbers";
import PageButton from "./PageButton";

function PaginationButtons() {
  const {
    dispatch,
    tableData: { totalPages, selectedPage, nextPageUrl, prevPageUrl },
  } = useDataTable();
  const { t } = useLanguageData();
  function pageSelectionHandler(val) {
    dispatch({ type: "pageSelected", payload: val });
  }

  const buttonCount = calculateButtonNumbers(totalPages, selectedPage);
  return (
    <div className="flex items-center gap-2">
      {prevPageUrl && (
        <PageButton
          disabled={selectedPage === 1}
          onClick={() => pageSelectionHandler(selectedPage - 1)}
        >
          {t("prevPage")}
        </PageButton>
      )}
      {buttonCount.map((el) => {
        return (
          <PageButton
            selected={el.val === selectedPage}
            key={el.val}
            onClick={() => pageSelectionHandler(el.val)}
          >
            {el.name}
          </PageButton>
        );
      })}
      {nextPageUrl && (
        <PageButton onClick={() => pageSelectionHandler(selectedPage + 1)}>
          {t("nextPage")}
        </PageButton>
      )}
      {/* <p>
          Strona {selectedPage} z {totalPages}
        </p> */}
    </div>
  );
}

export default PaginationButtons;
