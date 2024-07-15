import { useAuth } from "../contexts/AuthContext";
import { useBotData } from "../contexts/BotDataContext";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { upperCaseBotName } from "../helpers/uppercaseBotName";
import Button from "./Button";
import { useDataTable } from "../contexts/DataTableContext";
import Dropdown from "./Dropdown";
import { useLanguageData } from "../contexts/LanguageContext";

function Header() {
  const { dispatch: botDataDispatch, showReturnButton } = useBotData();
  const { section } = useParams();
  const { botName } = useParams();
  const { user, dispatch } = useAuth();
  const { dispatch: dataTableDispatch } = useDataTable();
  const { t } = useLanguageData();
  const navigate = useNavigate();
  const location = useLocation();
  function logoutHandler() {
    dispatch({ type: "logout", payload: location.pathname });
    botDataDispatch({ type: "loggedOut" });
    navigate(`/${section}/login`);
  }

  function returnHandler() {
    dataTableDispatch({ type: "conversationLeft" });
    botDataDispatch({ type: "conversationExited" });
  }

  return (
    <div className="flex h-auto items-center justify-between bg-sky-800 p-4 text-white">
      <div className="flex items-center gap-6">
        <img
          className="h-auto w-10"
          src="/images/pb_logo.png"
          alt="Primebot logo"
        />
        <h1 className="text-xl font-bold">{upperCaseBotName(botName)}</h1>
        {showReturnButton && (
          <NavLink to={`/bots/${botName}`}>
            <Button onClick={returnHandler}>{t("backToRecordList")}</Button>
          </NavLink>
        )}
        <Dropdown />
      </div>
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">{t("loggedAs", { user })}</h1>
        <Button type="logout" onClick={logoutHandler}>
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}

export default Header;
