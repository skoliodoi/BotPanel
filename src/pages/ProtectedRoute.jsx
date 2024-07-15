import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, dispatch, checkToken } = useAuth();
  const { section } = useParams();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken && !isAuthenticated) {
      checkToken(accessToken, refreshToken);
    }
    if (!isAuthenticated) {
      dispatch({ type: "unauthorizedEntry", payload: location.pathname });
      navigate(`/${section}/login`);
    }
  }, [
    isAuthenticated,
    navigate,
    location,
    dispatch,
    checkToken,
    section,
  ]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
