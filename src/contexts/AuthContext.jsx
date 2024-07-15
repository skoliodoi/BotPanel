import { useContext, useReducer } from "react";
import { createContext } from "react";
import { authReducer, initialState } from "../reducers/authReducer";
import config from "../helpers/siteConfig";
import { useQueryClient } from "react-query";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [
    { user, isAuthenticated, accessToken, refreshToken, error, loggingIn, forwardPath },
    dispatch,
  ] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();

  async function checkToken(access, refresh) {
    let formData = new FormData();
    formData.append("token", access);
    try {
      const res = await fetch(
        `${config.apiBaseUrl}/${config.tokenValidationUrl}`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (res.ok) {
        dispatch({ type: "tokenPassed", payload: access });
      } else {
        if (res.status === 401) {
          formData = new FormData();
          formData.append("refresh", refresh);
          const ref = await fetch(
            `${config.apiBaseUrl}/${config.tokenRefreshUrl}`,
            {
              method: "POST",
              body: formData,
            },
          );
          if (ref.ok) {
            const { access: newAccessToken } = await ref.json();
            dispatch({ type: "tokenPassed", payload: newAccessToken });
            queryClient.invalidateQueries({ queryKey: ["zapisy"] });
          }
        } else {
          console.log(res.status);
          throw new Error("Coś nie bangla");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function login(user, password) {
    dispatch({ type: "loggingIn" });
    let formData = new FormData();
    formData.append("username", user);
    formData.append("password", password);
    try {
      const res = await fetch(`${config.apiBaseUrl}/${config.apiTokenUrl}`, {
        method: "POST",
        body: formData,
      });
      const { access, refresh } = await res.json();
      if (res.ok) {
        dispatch({ type: "loggedIn", payload: { user, access, refresh } });
      } else {
        throw new Error("Dane logowania niepoprawne!");
      }
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        accessToken,
        refreshToken,
        login,
        error,
        loggingIn,
        dispatch,
        checkToken,
        forwardPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
