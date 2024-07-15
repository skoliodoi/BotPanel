import { Outlet } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { checkBotAvailability } from "../services/botApi";
import { useLanguageData } from "../contexts/LanguageContext";
import { useBotData } from "../contexts/BotDataContext";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import Error from "../ui/Error";

function PanelLayout() {
  const { botName: botNameFromParams } = useParams();
  const { dispatch } = useBotData();
  const { t } = useLanguageData();
  const { isLoading, isError } = useQuery({
    queryKey: "bots",
    queryFn: () => checkBotAvailability(botNameFromParams),
    onSuccess() {
      dispatch({
        type: "botNameFound",
        payload: {
          botName: botNameFromParams,
        },
      });
    },
  });
  if (isLoading) {
    return <Loader loaderText={"botSearch"} />;
  }

  if (isError) {
    const errorText = t("botNotFound", { botName: botNameFromParams });
    return <Error errorText={errorText} />;
  }
  return (
    <div className="flex h-dvh flex-col ">
      <Header />
      <Outlet />
    </div>
  );
}

export default PanelLayout;
