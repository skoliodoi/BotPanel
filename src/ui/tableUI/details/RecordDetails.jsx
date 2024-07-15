// import { useEffect } from "react";
import { useDataTable } from "../../../contexts/DataTableContext";
import RecordDetailsHeader from "./RecordDetailsHeader";
import RecordDetailsInfo from "./RecordDetailsInfo";
import ConversationDetails from "./ConversationDetails";
import Loader from "../../Loader";
import useConversationData from "../../../hooks/useConversationData";
import Error from "../../Error";
import { useBotData } from "../../../contexts/BotDataContext";
import { useEffect } from "react";
import { useLanguageData } from "../../../contexts/LanguageContext";
// import { useEffect } from "react";

function RecordDetails() {
  const {
    tableData: { conversationDetails },
  } = useDataTable();

  const { isLoading, isError } = useConversationData();
  const { dispatch } = useBotData();
  const { t } = useLanguageData;

  useEffect(() => {
    dispatch({ type: "conversationEntered" });
  }, [dispatch]);

  if (isLoading || !conversationDetails)
    return <Loader loaderText={"downloadingDetails"} />;

  if (isError) {
    const errorText = t("noConversationDetails");
    return <Error errorText={errorText} />;
  }

  const {
    zapis,
    number,
    start_time,
    end_time,
    timeDiff,
    uid,
    recording,
    user,
  } = conversationDetails;

  return (
    <>
      <RecordDetailsHeader>
        <RecordDetailsInfo label="UID rozmowy" data={uid} />
        <RecordDetailsInfo
          label={user ? "userMail" : "phoneNumber"}
          data={user ? user : number}
        />
        <RecordDetailsInfo label="convoStart" data={start_time} />
        <RecordDetailsInfo label="convoEnd" data={end_time} />
        {!user && (
          <RecordDetailsInfo label="timeDiff" data={timeDiff} />
        )}
      </RecordDetailsHeader>
      <ConversationDetails conversation={zapis} recording={recording} />
    </>
  );
}

export default RecordDetails;
