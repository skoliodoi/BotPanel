import { createContext, useContext, useReducer, useRef, useState } from "react";
// import { useBotData } from "./BotDataContext";
import {
  initialDataTableState,
  dataTableReducer,
} from "../reducers/dataTableReducer";
// import { DateTime } from "luxon";

const DataTableContext = createContext();

function DataTableProvider({ children }) {
  const gridRef = useRef();
  // const { conversationId } = useBotData();
  // const [searchFilter, setSearchFilter] = useState("");
  // const [conversationDetails, setConversationDetails] = useState(null);
  const [rowData, setRowData] = useState([]);
  // const [showReturnButton, setShowReturnButton] = useState(false);

  const [tableData, dispatch] = useReducer(
    dataTableReducer,
    initialDataTableState,
  );

  function rowDataHandler(val) {
    setRowData(val);
  }

  // function returnButtonHandler(val) {
  //   setShowReturnButton(val);
  // }

  // function searchFilterHandler(val) {
  //   setSearchFilter(val);
  // }

  // function findRowDetailsHandler() {
  //   const rowDetails = rowData?.find((el) => el._id === conversationId);
  //   setConversationDetails(rowDetails);
  // }

  function exportToCSV() {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  }

  return (
    <DataTableContext.Provider
      value={{
        dispatch,
        tableData,
        // searchFilter,
        // searchFilterHandler,
        // conversationDetails,
        // findRowDetailsHandler,
        gridRef,
        exportToCSV,
        rowData,
        rowDataHandler,
        // showReturnButton,
        // returnButtonHandler,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("BotDataContext was used outside of BotDataProvider");
  }
  return context;
}

export { DataTableProvider, useDataTable };
