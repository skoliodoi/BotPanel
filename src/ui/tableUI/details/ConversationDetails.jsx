import { useLanguageData } from "../../../contexts/LanguageContext";
import { FiDownload } from "react-icons/fi";
import ConversationSentence from "./ConversationSentence";
import { useEffect, useState } from "react";
import useIsMount from "../../../hooks/useIsMount";

function ConversationDetails({ conversation, recording }) {
  const { t } = useLanguageData();
  const [ts, setTs] = useState(0);
  const isMount = useIsMount();
  useEffect(() => {
    if (isMount) {
      return;
    }
    const audio = document.getElementById("conversation-audio");
    if (audio) {
      audio.currentTime = ts;
      audio.play();
    }
  }, [ts, setTs, isMount]);
  if (!conversation)
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">{t("noTranscription")}</h1>
      </div>
    );
  return (
    <div className="static flex h-screen flex-col items-center overflow-auto bg-white">
      <main className="flex-1  items-center  bg-white">
        <div className="sticky top-0 flex flex-col items-center justify-center gap-4 bg-white py-2">
          <h1 className="mt-4 text-center text-4xl font-bold text-sky-900">
            {t("conversationDetails")}
          </h1>
          {recording && (
            <div className="flex justify-between gap-3">
              <audio id="conversation-audio" className="rounded-lg" controls>
                <source src={`${recording}#t=12`} type="audio/wav"></source>
              </audio>
              <a
                className="flex items-center rounded-md bg-sky-900 px-4 py-2 text-white outline-none hover:border-sky-900 hover:bg-white hover:font-bold hover:text-sky-900"
                href={recording}
                download={recording}
              >
                <FiDownload />
              </a>
            </div>
          )}
        </div>
        <ul className="flex w-screen flex-col items-center p-6 text-sky-900">
          {conversation.map((zapis) => {
            return (
              <ConversationSentence
                key={zapis.ts}
                onChooseTs={setTs}
                sentence={zapis}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default ConversationDetails;
