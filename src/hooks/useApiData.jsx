import { useQuery } from "react-query";
import { getBotDataFromApi } from "../services/botApi";
import { useDataTable } from "../contexts/DataTableContext";
import { useBotData } from "../contexts/BotDataContext";
import { useAuth } from "../contexts/AuthContext";
import useDebounce from "./useDebounce";

function useApiData() {
  const {
    // dispatch,
    tableData: {
      timePeriod: dates,
      selectedPage,
      pageUrl,
      pageSize,
      filters: {
        phone: phoneFilter,
        // startDate: startDateFilter,
        // endDate: endDateFilter,
        status: statusFilter,
        content: contentFilter,
      },
      sortArray,
    },
  } = useDataTable();
  const { botName } = useBotData();
  const { accessToken } = useAuth();
  const debouncedPhoneQuery = useDebounce(phoneFilter, 1000);
  // const debouncedStartDateQuery = useDebounce(startDateFilter, 1000);
  // const debouncedEndDateQuery = useDebounce(endDateFilter, 1000);
  const debouncedStatusQuery = useDebounce(statusFilter, 1000);
  const debouncedContentQuery = useDebounce(contentFilter, 1000);
  const {
    data: responseData,
    isLoading,
    isSuccess,
    status,
  } = useQuery({
    queryKey: [
      "zapisy",
      accessToken,
      dates,
      selectedPage,
      pageSize,
      debouncedPhoneQuery,
      // debouncedStartDateQuery,
      // debouncedEndDateQuery,
      debouncedStatusQuery,
      debouncedContentQuery,
      sortArray,
    ],
    queryFn: async () => {
      return getBotDataFromApi(
        botName,
        accessToken,
        dates,
        selectedPage,
        pageSize,
        pageUrl,
        phoneFilter,
        // startDateFilter,
        // endDateFilter,
        statusFilter,
        contentFilter,
        sortArray,
      );
    },
    // enabled: !!phoneFilter.trim(),
    keepPreviousData: true,
  });

  return { responseData, isLoading, isSuccess, status };
}

export default useApiData;
