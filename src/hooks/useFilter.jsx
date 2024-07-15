import { useQuery } from "react-query";
import { useDataTable } from "../contexts/DataTableContext";
import useDebounce from "./useDebounce";
import { getFilteredDataFromApi } from "../services/filterApi";
import { useAuth } from "../contexts/AuthContext";
import { useBotData } from "../contexts/BotDataContext";


function usePhoneFilter() {
  const { accessToken } = useAuth();
  const { botName } = useBotData();
  const {
    tableData: {
      filters: { phoneFilter, startDateFilter, endDateFilter },
    },
  } = useDataTable();
  const debouncedPhoneQuery = useDebounce(phoneFilter, 500);
  const debouncedStartDateQuery = useDebounce(startDateFilter, 500);
  const debouncedEndDateQuery = useDebounce(endDateFilter, 500);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "filterData",
      debouncedPhoneQuery,
      debouncedStartDateQuery,
      debouncedEndDateQuery,
    ],
    queryFn: () => {
      getFilteredDataFromApi(
        botName,
        accessToken,
        phoneFilter,
        startDateFilter,
        endDateFilter,
      );
    },
    enabled: !!phoneFilter.trim(),
    keepPreviousData: true,
  });
  return { data, isLoading, isSuccess };
}

export default usePhoneFilter;
