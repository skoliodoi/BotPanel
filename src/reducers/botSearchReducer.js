const initialBotState = {
  botName: null,
  conversationId: null,
  showReturnButton: false,
};

function botSearchReducer(state, action) {
  switch (action.type) {
    case "botNameFound":
      return {
        ...state,
        botName: action.payload.botName,
        conversationId: action.payload.conversationId,
      };
    case "conversationEntered":
      return { ...state, showReturnButton: true };
    case "conversationExited":
      return { ...state, showReturnButton: false };
    case "loggedOut":
      return { ...initialBotState, botName: state.botName };
    default:
      throw new Error("Action unrecognized!");
  }
}

export { initialBotState, botSearchReducer };
