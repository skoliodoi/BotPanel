const initialDataTableState = {
  timePeriod: { startDate: null, endDate: null },
  filters: {
    phone: "",
    startDate: "",
    endDate: "",
    status: "",
    content: "",
  },
  sortArray: [],
  conversationDetails: null,
  apiTableData: null,
  selectedPage: 1,
  pageSize: 100,
  totalPages: 1,
  nextPageUrl: null,
  prevPageUrl: null,
  pageUrl: null,
  totalCount: 0,
  totalCountOnPage: 0,
  downloadingData: false,
};

function dataTableReducer(state, action) {
  function containsWordOrHyphenWord(array, word) {
    const regex = new RegExp(`^-?${word}$`);
    return array.some((item) => regex.test(item));
  }

  function findIndex(arr, param) {
    const index = arr.findIndex((item) =>
      new RegExp(`^-?${param}$`).test(item),
    );
    return index;
  }
  switch (action.type) {
    case "sortingSet": {
      const { type, sorting } = action.payload;
      let newSortArray = [...state.sortArray];
      let paramName = "";
      if (type === "phone") paramName = "number";
      if (type === "startDate") paramName = "start_time";
      if (type === "endDate") paramName = "end_time";
      const paramIndex = findIndex(newSortArray, paramName);
      if (sorting) {
        if (containsWordOrHyphenWord(state.sortArray, paramName)) {
          newSortArray[paramIndex] =
            `${sorting === "desc" ? "-" : ""}${paramName}`;
        } else {
          newSortArray.push(paramName);
        }
      } else {
        if (containsWordOrHyphenWord(state.sortArray, paramName)) {
          // const paramIndex = newSortArray.findIndex((item) =>
          //   new RegExp(`^-?${paramName}$`).test(item),
          // );
          newSortArray.splice(paramIndex, 1);
        }
      }
      return { ...state, sortArray: newSortArray };
    }
    case "phoneFilterSet":
      return {
        ...state,
        filters: {
          ...state.filters,
          phone: action.payload,
          downloadingData: true,
        },
      };
    case "phoneFilterCleared":
      return {
        ...state,
        filters: { ...state.filters, phone: "", downloadingData: true },
      };
    case "startDateFilterSet":
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: action.payload,
          downloadingData: true,
        },
      };
    case "startDateFilterCleared":
      return {
        ...state,
        filters: { ...state.filters, startDate: "" },
        downloadingData: true,
      };
    case "endDateFilterSet":
      return {
        ...state,
        filters: { ...state.filters, endDate: action.payload },
        downloadingData: true,
      };
    case "endDateFilterCleared":
      return {
        ...state,
        filters: { ...state.filters, endDate: "" },
        downloadingData: true,
      };
    case "statusFilterSet":
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
        downloadingData: true,
      };
    case "statusFilterCleared":
      return {
        ...state,
        filters: { ...state.filters, status: "" },
        downloadingData: true,
      };
    case "contentFilterSet":
      return {
        ...state,
        filters: { ...state.filters, content: action.payload },
        downloadingData: true,
      };
    case "contentFilterCleared":
      return {
        ...state,
        filters: { ...state.filters, content: "" },
        downloadingData: true,
      };
    case "keywordFilterSet":
      return {
        ...state,
        filters: { ...state.filters, keywordFilter: action.payload },
        downloadingData: true,
      };
    case "datesSelected":
      return { ...state, timePeriod: action.payload, downloadingData: true };
    case "pageSizeSelected":
      return { ...state, pageSize: action.payload, downloadingData: true };
    case "pageSelected":
      return {
        ...state,
        selectedPage: action.payload,
        pageUrl: null,
        downloadingData: true,
      };
    case "urlSelected":
      return { ...state, pageUrl: action.payload, downloadingData: true };
    case "conversationFound":
      return {
        ...state,
        conversationDetails: action.payload,
      };
    case "conversationLeft":
      return { ...state, conversationDetails: null };
    case "tableDataFetched": {
      const { next_page_url, prev_page_url, page, total_pages, total_count } =
        action.payload.paginationDetails;
      return {
        ...state,
        apiTableData: action.payload.rowData,
        selectedPage:
          page <= total_pages ? page : total_pages > 0 ? total_pages : 1,
        totalPages: total_pages,
        totalCount: total_count,
        totalCountOnPage: action.payload.rowData.length,
        nextPageUrl: next_page_url,
        prevPageUrl: prev_page_url,
        downloadingData: false,
      };
    }
    default:
      throw new Error("Action unrecognized!");
  }
}

export { initialDataTableState, dataTableReducer };
