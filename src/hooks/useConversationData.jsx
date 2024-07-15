import { useQuery } from "react-query";
// import { useDataTable } from "../contexts/DataTableContext";
import { useBotData } from "../contexts/BotDataContext";
import { useAuth } from "../contexts/AuthContext";
import { getConversationDataFromApi } from "../services/conversationApi";
import { useDataTable } from "../contexts/DataTableContext";
import { sortRowData } from "../helpers/sortRowData";
import { useParams } from "react-router-dom";

function useConversationData() {
  const { botName } = useBotData();
  const { conversationId } = useParams();
  const { dispatch } = useDataTable();
  const { checkToken, accessToken, refreshToken } = useAuth();
  const { isLoading, isError } = useQuery({
    queryKey: ["rozmowa"],
    queryFn: () => {
      checkToken(accessToken, refreshToken);
      return getConversationDataFromApi(botName, accessToken, conversationId);
    },
    onSuccess: (responseData) => {
      const { data } = responseData;
      const sortedData = sortRowData(data);
      const [freeObj] = sortedData;
      dispatch({ type: "conversationFound", payload: freeObj });
    },
  });

  return { isLoading, isError };
}
export default useConversationData;
