import { createContext, useContext, useReducer } from "react";
import {
  botSearchReducer,
  initialBotState,
} from "../reducers/botSearchReducer";

const BotDataContext = createContext();

function BotDataProvider({ children }) {
  const [{ botName, conversationId, showReturnButton }, dispatch] = useReducer(
    botSearchReducer,
    initialBotState,
  );

  return (
    <BotDataContext.Provider
      value={{ botName, conversationId, showReturnButton, dispatch }}
    >
      {children}
    </BotDataContext.Provider>
  );
}

function useBotData() {
  const context = useContext(BotDataContext);
  if (context === undefined) {
    throw new Error("BotDataContext was used outside of BotDataProvider");
  }
  return context;
}

export { BotDataProvider, useBotData };
