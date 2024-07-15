import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useBotData } from "../../contexts/BotDataContext";
import { useDataTable } from "../../contexts/DataTableContext";
import { useNavigate, useParams } from "react-router-dom";
import { filterRowData } from "../../helpers/filterRowData";
import useApiData from "../../hooks/useApiData";
import Loader from "../Loader";
import { useEffect, useMemo, useState } from "react";
import { sortRowData } from "../../helpers/sortRowData";
import TableHeader from "./TableHeader";
import { useLanguageData } from "../../contexts/LanguageContext";
import AudioRecording from "./AudioRecording";

// import usePhoneFilter from "../../hooks/useFilter";

function DataTable() {
  const [hasAudio, setHasAudio] = useState(false);
  const { dispatch } = useBotData();
  const { botName } = useParams();
  const { t } = useLanguageData();
  const {
    tableData: {
      apiTableData,
      // downloadingData,
      // filters: { keywordFilter },
    },
    dispatch: dataTableDispatch,
    gridRef,
    date,
  } = useDataTable();
  const { responseData, isLoading, isSuccess } = useApiData();

  useEffect(() => {
    if (isSuccess && responseData) {
      const { data, ...rest } = responseData;
      const audioFound = data.find((el) =>
        Object.keys(el).includes("recording"),
      );
      if (audioFound) setHasAudio(true);
      const sortedData = sortRowData(data);
      dataTableDispatch({
        type: "tableDataFetched",
        payload: { rowData: sortedData, paginationDetails: rest },
      });
    }
  }, [responseData, isSuccess, dataTableDispatch]);

  const rowData = filterRowData(apiTableData, date);
  const navigate = useNavigate();
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: false,
    }),
    [],
  );

  const isChat = botName.includes("_chat");

  function rowClickedHandler({ data }) {
    const { _id: conversationId } = data;
    dispatch({
      type: "botNameFound",
      payload: {
        botName: botName,
        conversationId,
      },
    });
    let path = `/bots/${botName}/${conversationId}`;
    navigate(path);
  }
  let columnDefs = [
    {
      // headerName: !isChat ? "Numer telefonu" : "Użytkownik",
      field: !isChat ? "number" : "user",
      flex: 1,
      sortable: false,
      headerComponent: TableHeader,
      headerComponentParams: {
        title: !isChat ? t("phoneNumber") : t("userMail"),
        type: "phone",
        filter: true,
      },
      onCellClicked: rowClickedHandler,
    },
    {
      headerName: t("startTime"),
      field: "start_time",
      headerComponent: TableHeader,
      headerComponentParams: {
        title: t("startTime"),
        type: "startDate",
        filter: false,
      },

      onCellClicked: rowClickedHandler,
    },
    {
      headerName: t("endTime"),
      field: "end_time",
      headerComponent: TableHeader,
      headerComponentParams: {
        title: t("endTime"),
        type: "endDate",
        filter: false,
      },

      onCellClicked: rowClickedHandler,
    },
    {
      headerName: t("botHangup"),
      field: "bot_hangup",
      onCellClicked: rowClickedHandler,
    },
    {
      headerName: t("forwarded"),
      field: "forwarded",
      onCellClicked: rowClickedHandler,
    },
    {
      field: "lastStatus",
      headerComponent: TableHeader,
      headerComponentParams: {
        title: t("lastStatus"),
        type: "status",
        filter: true,
      },
      onCellClicked: rowClickedHandler,
    },
  ];
  if (!isChat) {
    columnDefs = [
      ...columnDefs.slice(0, 3),
      { headerName: t("timeDiff"), field: "timeDiff" },
      ...columnDefs.slice(3),
    ];
  }

  if (hasAudio) {
    columnDefs.push({
      headerName: "Nagranie",
      field: "recording",
      minWidth: 400,
      cellRenderer: (props) => {
        return <AudioRecording recording={props.value} />;
      },
    });
  }

  if (isLoading || !responseData)
    return <Loader loaderText="downloadingData" />;

  return (
    <div className="w-screen flex-1">
      <div
        className="ag-theme-alpine"
        style={{ height: "100%", textAlign: "center" }}
      >
        <AgGridReact
          reactiveCustomComponents={true}
          ref={gridRef}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection="single"
          // onRowClicked={rowClickedHandler}
        />
      </div>
    </div>
  );
}

export default DataTable;
