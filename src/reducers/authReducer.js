const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
  loggingIn: false,
  forwardPath: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "unauthorizedEntry":
      return { ...state, forwardPath: action.payload };
    case "loggingIn":
      return {
        ...state,
        error: null,
        loggingIn: true,
      };
    case "loggedIn":
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
        error: null,
        loggingIn: false,
      };
    case "tokenPassed":
      localStorage.setItem("accessToken", action.payload);
      return {
        ...state,
        accessToken: action.payload,
        isAuthenticated: true,
        user: localStorage.getItem("user"),
      };
    case "logout":
      localStorage.clear();
      return { ...initialState, forwardPath: action.payload };
    case "error":
      return { ...state, loggingIn: false, error: action.payload };
    default:
      throw new Error("Action unrecognized");
  }
}

export { authReducer, initialState };
