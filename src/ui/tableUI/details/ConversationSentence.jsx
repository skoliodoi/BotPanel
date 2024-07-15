import { useLanguageData } from "../../../contexts/LanguageContext";
import { formatTime } from "../../../helpers/sortRowData";

function ConversationSentence({ sentence, onChooseTs }) {
  const botSpeaking = sentence.bot;
  const conversationTime = formatTime(sentence.ts);
  const { t } = useLanguageData();
  return (
    <li className="mb-2 mt-2 flex w-full text-wrap px-4">
      <div
        onClick={() => onChooseTs(sentence.audioTs)}
        className={`min-w-80 flex-none cursor-pointer font-bold  ${botSpeaking ? "text-sky-900" : "text-emerald-700"}`}
      >
        {botSpeaking ? "Bot" : t("talker")} ({conversationTime}):
      </div>
      <div className={`${botSpeaking ? "text-sky-900" : "text-emerald-700"}`}>
        {sentence.t}
      </div>
    </li>
  );
}

export default ConversationSentence;
